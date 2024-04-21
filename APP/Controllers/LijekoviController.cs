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
                var lijekIzBaze = _context.Lijekovi.Find(sifra);
                if (lijekIzBaze == null)
                {
                    return NoContent();
                }

                lijekIzBaze.Tip = lijekovi.Tip;
                lijekIzBaze.Doza = lijekovi.Doza;
                lijekIzBaze.Brojtableta = lijekovi.Brojtableta;
                lijekIzBaze.Nacinprimjene = lijekovi.Nacinprimjene;
                lijekIzBaze.Datumpodizanja = lijekovi.Datumpodizanja; // Dodajte ažuriranje datuma

                _context.Lijekovi.Update(lijekIzBaze);
                _context.SaveChanges();
                return Ok(lijekIzBaze);
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
                var lijekIzBaze = _context.Lijekovi.Find(sifra);
                if (lijekIzBaze == null)
                {
                    return NoContent();
                }
                _context.Lijekovi.Remove(lijekIzBaze);
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