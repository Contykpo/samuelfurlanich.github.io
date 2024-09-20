using Microsoft.Extensions.Localization;

namespace samuelfurlanich.github.io.Resources
{
    public class MainResources
    {
        #region Properties and Fields

        private readonly IStringLocalizer<MainResources> _localizer;

        // Properties:

        public string Title => _localizer["Title"];
        public string Description => _localizer["Description"];

        #endregion

        #region Constructors

        public MainResources(IStringLocalizer<MainResources> localizer)
        {
            _localizer = localizer;
        }

        #endregion
    }
}
