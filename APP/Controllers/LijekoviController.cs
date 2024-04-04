using APP.Data;
using APP.Models;
using Microsoft.AspNetCore.Mvc;


namespace APP.Controllers
{
    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetom lijekovi u bazi
    /// </summary>
    
    [ApiController]
    [Route("api/v1/[controller]")]
    public class LijekoviController : ControllerBase
    {
        private readonly LijekoviContext _context;

        public LijekoviController(LijekoviContext context) 
        {
            _context = context;
        }
        /// <summary>
        /// Dohvaća sve lijekove iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        ///     Get api/v1/Lijekovi
        /// </remarks>
        /// <returns> Lijekovi u bazi </returns>
        /// <response code="200">Sve OK </response>
        /// <response code="400">Zahtjev nije valjan</response>
        
        [HttpGet]

        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var lijekovi = _context.Lijekovi.ToList();
                if (lijekovi == null || lijekovi.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(lijekovi);
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }
        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            // kontrola ukoliko upit nije valjan
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var lijekovi = _context.Lijekovi.Find(sifra);
                if (lijekovi == null)
                {
                    return new EmptyResult();
                }
                return new JsonResult(lijekovi);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Dodaje novi lijek u bazu
        /// </summary>
        /// <remarks>
        ///     POST api/v1/Smjer
        ///     {naziv: "Primjer lijeka"}
        /// </remarks>
        /// <param name="lijek">Smjer za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Smjer s šifrom koju je dala baza</returns>
        
        [HttpPost]
        public IActionResult Post(Lijekovi entitet )
        {
            if (!ModelState.IsValid || entitet == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Lijekovi.Add(entitet);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, entitet);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }
        /// <summary>
        /// Mijenja podatke postojećeg lijeka u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/lijekovi/1
        ///
        /// {
        ///  "sifra": 0,
        ///  "tip": "Tip lijeka",
        ///  "Doza": "Doza koja se uzima",
        ///  "Broj tableta": Broj tableta,
        ///  "Nacin primjene": "Nacin primjene lijeka",
        ///  "Datum podizanja lijeka ":11.12.2023. ""
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra smjera koji se mijenja</param>  
        /// <param name="smjer">Smjer za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od smjera koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi smjera kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 

        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Lijekovi lijekovi)
        {
            if (sifra<=0 || !ModelState.IsValid || lijekovi ==null)
            {
                return BadRequest();
            }
            try
            {
                var smjerIzBaze = _context.Lijekovi.Find(lijekovi);
                if (smjerIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, lijekovi);
                }

                smjerIzBaze.Tip = lijekovi.Tip;
                smjerIzBaze.Doza = lijekovi.Doza;
                smjerIzBaze.Brojtableta = lijekovi.Brojtableta;
                smjerIzBaze.Nacinprimjene = lijekovi.Nacinprimjene;

                _context.Lijekovi.Update(smjerIzBaze);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, smjerIzBaze);
              
           }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid || sifra <=0)
            {
                return BadRequest();
            }
            try
            {
                var smjerIzBaze = _context.Lijekovi.Find(sifra);
                if (smjerIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }
                _context.Lijekovi.Remove(smjerIzBaze);
                _context.SaveChanges();

                return new JsonResult("{\"poruka\": \"Obrisano\"}");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

    }


}
