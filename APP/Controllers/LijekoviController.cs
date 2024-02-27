using APP.Data;
using APP.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

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
        [HttpPost]
        public IActionResult Post(Lijekovi lijekovi )
        {
            if (!ModelState.IsValid || lijekovi == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Lijekovi.Add(lijekovi);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, lijekovi);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }
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
