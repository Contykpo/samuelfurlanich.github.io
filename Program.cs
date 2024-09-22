using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.JSInterop;

using samuelfurlanich.github.io;
using samuelfurlanich.github.io.Services;
using samuelfurlanich.github.io.Resources;
using System.Globalization;
using samuelfurlanich.github.io.Extensions;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<HeroImageService>();

builder.Services.AddBlazorBootstrap();

builder.Services.AddLocalization();

var host = builder.Build();

await host.SetDefaultCulture();
await host.RunAsync();