using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using EdunovaAPP.Models;

namespace APP.Models
{
    public class Lijekovi : Entitet
    {

        /// <summary>
        /// Tip lijeka
        /// </summary>
        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Tip { get; set; }

        /// <summary>
        /// Doza 
        /// </summary>

        [Range(1,1000, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        [Column("Doza")]
        public int? Doza { get; set; }

        /// <summary>
        /// broj tableta 
        /// </summary>
        [Range(0, 100, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        public int? Brojtableta { get; set; }

        /// <summary>
        /// Nacin primjene oralno, intravenozno,etc...
        /// </summary>
        public string? Nacinprimjene { get; set; }

        /// <summary>
        /// Datum podizanja lijeka 
        /// </summary>
        public DateTime? Datumpodizanja { get; set; }

    }
}
