using APP.Models;
using Microsoft.EntityFrameworkCore;

namespace APP.Data
{
    public class LijekoviContext: DbContext
    {
        public LijekoviContext(DbContextOptions<LijekoviContext>options) 
            : base(options) 
        {

        }
        public DbSet<Lijekovi> Lijekovi { get; set; }
    }
}
