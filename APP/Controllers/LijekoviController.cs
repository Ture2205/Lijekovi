using APP.Data;
using APP.Models;
using Microsoft.AspNetCore.Mvc;


namespace APP.Controllers
{
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
            try
            {
                var lijekovi = _context.Lijekovi.ToList();
                if (lijekovi == null || lijekovi.Count == 0)
                {
                    return NoContent();
                }
                return Ok(lijekovi);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            // kontrola ukoliko upit nije valjan
            if (sifra <= 0)
            {
                return BadRequest();
            }
            try
            {
                var lijekovi = _context.Lijekovi.Find(sifra);
                if (lijekovi == null)
                {
                    return NoContent();
                }
                return Ok(lijekovi);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
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
        /// <response code="503">Baza nedostupna</response> 
        /// <returns>Lijek sa šifrom koju je dala baza</returns>
        
        [HttpPost]
        public IActionResult Post(Lijekovi entitet)
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
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
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
        /// <param name="sifra">Šifra lijeka koji se mijenja</param>  
        /// <param name="lijek">Lijek za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od lijekova koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi lijeka kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response>
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Lijekovi lijekovi)
        {
            if (sifra <= 0 || !ModelState.IsValid || lijekovi == null)
            {
                return BadRequest();
            }
            try
            {
                var smjerIzBaze = _context.Lijekovi.Find(sifra);
                if (smjerIzBaze == null)
                {
                    return NoContent();
                }

                smjerIzBaze.Tip = lijekovi.Tip;
                smjerIzBaze.Doza = lijekovi.Doza;
                smjerIzBaze.Brojtableta = lijekovi.Brojtableta;
                smjerIzBaze.Nacinprimjene = lijekovi.Nacinprimjene;

                _context.Lijekovi.Update(smjerIzBaze);
                _context.SaveChanges();
                return Ok(smjerIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (sifra <= 0)
            {
                return BadRequest();
            }
            try
            {
                var smjerIzBaze = _context.Lijekovi.Find(sifra);
                if (smjerIzBaze == null)
                {
                    return NoContent();
                }
                _context.Lijekovi.Remove(smjerIzBaze);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }
    }
}
