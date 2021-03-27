using System.IO;

namespace Portfolio.HtmlGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            var type = "paysage";
            var output = $"{type}html.txt";
            if (File.Exists(output))
            {
                File.Delete(output);
            }

            using (var fs = new StreamWriter(File.Create(output)))
            {
                int galleryItems = 20;
                for (var i = 1; i <= galleryItems; ++i)
                {
                    fs.WriteLine($@"<a href=""images/highres/{type}/{i}.jpg"" data-lightbox=""portfolio"">");
                    fs.WriteLine($@"    <img src=""images/{type}/{i}.jpg"" alt="""" />");
                    fs.WriteLine($@"</a>");
                }
            }
        }
    }
}
