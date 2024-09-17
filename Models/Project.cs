namespace samuelfurlanich.github.io.Models
{
    public class Project
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;

        public List<string>? PreviewImages { get; set; } = new List<string>();
        public List<string>? Technologies { get; set; } = new List<string>(); 
    }
}
