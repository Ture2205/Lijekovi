using APP.Data;
using Microsoft.EntityFrameworkCore;
using System.Reflection;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(sgo =>
{ // sgo je instanca klase SwaggerGenOptions
  // èitati https://devintxcontent.blob.core.windows.net/showcontent/Speaker%20Presentations%20Fall%202017/Web%20API%20Best%20Practices.pdf
    var o = new Microsoft.OpenApi.Models.OpenApiInfo()
    {
        Title = "Lijekovi API",
        Version = "v1",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact()
        {
            Email = "mario.turcek@gmail.com",
            Name = "Mario Turèek"
        },
        Description = "Ovo je dokumentacija za Lijekovi API",
        License = new Microsoft.OpenApi.Models.OpenApiLicense()
        {
            Name = "Edukacijska licenca"
        }
    };
    sgo.SwaggerDoc("v1", o);

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    sgo.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

});

// Svi se od svuda na sve moguæe naèine mogu spojitina naš API
// Èitati https://code-maze.com/aspnetcore-webapi-best-practices/
builder.Services.AddCors(opcije =>
{
    opcije.AddPolicy("CorsPolicy",
        builder =>
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );

});

//Dodavanje baze podataka
builder.Services.AddDbContext<LijekoviContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString(name: "LijekoviContext"))
);


var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
//Moguænost generiranja poziva rute u CMD i Powershell
app.UseSwaggerUI(opcije =>
{
    opcije.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
});
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseDeveloperExceptionPage();

app.MapFallbackToFile("index.html");

app.Run();