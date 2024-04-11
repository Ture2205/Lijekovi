using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using EdunovaAPP.Models;

namespace APP.Models
{
    public class Recepti: Entitet

    {
        /// <summary>
        /// Datum podizanja lijeka 
        /// </summary>
        public DateTime? Datumpodizanja { get; set; }

        /// <summary>
        /// Doza 
        /// </summary>

        [Range(1, 1000, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        [Column("Doza")]
        public int? Doza { get; set; }

        /// <summary>
        /// Ime Pacijenta 
        /// </summary>
        public string? Ime { get; set; }





    }
}
    

