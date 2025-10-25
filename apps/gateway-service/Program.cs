var builder = WebApplication.CreateBuilder(args);

// Add reverse proxy with configuration
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

// Configure CORS for both client and admin apps
builder.Services.AddCors(options =>
{
    options.AddPolicy("customPolicy", policy =>
    {
        var clientApp = builder.Configuration["ClientApp"];
        var adminApp = builder.Configuration["AdminApp"];

        policy.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins(clientApp!, adminApp!)
            .WithExposedHeaders("WWW-Authenticate");
    });
});

var app = builder.Build();

// Enable CORS
app.UseCors("customPolicy");

// Map reverse proxy routes
app.MapReverseProxy();

// Log startup information
app.Logger.LogInformation("🚀 Gateway Service is running");
app.Logger.LogInformation("📡 Proxying to microservices:");
app.Logger.LogInformation("   - Products: http://localhost:5001");
app.Logger.LogInformation("   - Orders: http://localhost:5002");
app.Logger.LogInformation("   - Payments: http://localhost:5003");

app.Run();
