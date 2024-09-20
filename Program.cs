using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.JSInterop;

using samuelfurlanich.github.io;
using samuelfurlanich.github.io.Services;
using samuelfurlanich.github.io.Resources;
using System.Globalization;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<HeroImageService>();

builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

// English-US is set as default culture
var culture = new CultureInfo("en-US");
CultureInfo.DefaultThreadCurrentCulture = culture;
CultureInfo.DefaultThreadCurrentUICulture = culture;

var host = builder.Build();

// Set culture on application start
var jsRuntime = host.Services.GetRequiredService<IJSRuntime>();
var savedCulture = await jsRuntime.InvokeAsync<string>("localStorage.getItem", "PortfolioCulture");

if (!string.IsNullOrWhiteSpace(savedCulture))
{
    culture = new CultureInfo(savedCulture);
    CultureInfo.DefaultThreadCurrentCulture = culture;
    CultureInfo.DefaultThreadCurrentUICulture = culture;
}

await host.RunAsync();