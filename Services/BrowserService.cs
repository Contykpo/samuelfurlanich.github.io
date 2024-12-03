using Microsoft.JSInterop;
using System.Threading.Tasks;
using samuelfurlanich.github.io.Models;

namespace samuelfurlanich.github.io.Services
{
    public class BrowserService
    {
        #region Events

        public event Action<BrowserDimensions> DimensionsChanged;

        #endregion

        #region Fields and Properties

        private readonly IJSRuntime _js;

        private BrowserDimensions _browserDimension;

        #endregion

        public BrowserService(IJSRuntime js)
        {
            _js = js;
        }

        public async Task<BrowserDimensions> GetDimensions()
        {
            var jsModule = await _js.InvokeAsync<IJSObjectReference>("import", "./js/windowDimensions.js");
            var dimensions = await jsModule.InvokeAsync<BrowserDimensions>("getWindowDimensions");

            return new BrowserDimensions { Width = dimensions.Width, Height = dimensions.Height };
        }

        public async Task RegisterResizeListener()
        {
            var jsModule = await _js.InvokeAsync<IJSObjectReference>("import", "./js/windowDimensions.js");
            await jsModule.InvokeVoidAsync("registerViewportChangeCallback", DotNetObjectReference.Create(this));
        }

        [JSInvokable]
        public void OnResize(int width, int height)
        {
            if (_browserDimension.Width == width && _browserDimension.Height == height) return;
            
            _browserDimension.Width = width;
            _browserDimension.Height = height;
            
            DimensionsChanged?.Invoke(_browserDimension);
        }
    }
}
