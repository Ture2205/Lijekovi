using APP.Data;
using APP.Models;
using Microsoft.AspNetCore.Mvc;


namespace APP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ReceptiController : ControllerBase
    {
        private readonly LijekoviContext _context;

        public ReceptiController(LijekoviContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var recepti = _context.Recepti.ToList();
                if (recepti == null || recepti.Count == 0)
                {
                    return NoContent();
                }
                return Ok(recepti);
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
                var recept = _context.Recepti.Find(sifra);
                if (recept == null)
                {
                    return NoContent();
                }
                return Ok(recept);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(Recepti entitet)
        {
            if (!ModelState.IsValid || entitet == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Recepti.Add(entitet);
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
        public IActionResult Put(int sifra, Recepti recepti)
        {
            if (sifra <= 0 || !ModelState.IsValid || recepti == null)
            {
                return BadRequest();
            }
            try
            {
                var receptIzBaze = _context.Recepti.Find(sifra);
                if (receptIzBaze == null)
                {
                    return NoContent();
                }

                // Ažuriranje datuma recepta
                receptIzBaze.Datumpodizanja = recepti.Datumpodizanja;

                // Ažuriranje ostalih atributa recepta
                receptIzBaze.Doza = recepti.Doza;
                receptIzBaze.Ime = recepti.Ime;

                _context.Recepti.Update(receptIzBaze);
                _context.SaveChanges();
                return Ok(receptIzBaze);
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
                var receptIzBaze = _context.Recepti.Find(sifra);
                if (receptIzBaze == null)
                {
                    return NoContent();
                }
                _context.Recepti.Remove(receptIzBaze);
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