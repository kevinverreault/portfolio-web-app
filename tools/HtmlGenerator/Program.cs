using System.IO;

namespace Portfolio.HtmlGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            var type = "paysage";
            var output = "html.txt";
            if (File.Exists(output))
            {
                File.Delete(output);
            }

            using var fs = new StreamWriter(File.Create(output));
            int galleryItems = 24;
            int lazyloading = 20;
            for (var i = 1; i <= galleryItems; ++i)
            {
                fs.WriteLine($@"<a href=""images/{type}/{i}-5x.jpg"" data-fancybox=""portfolio"">");
                fs.WriteLine($@"    <img srcset=""images/{type}/{i}-1x.jpg 320w,");
                fs.WriteLine($@"                images/{type}/{i}-2x.jpg 640w,");
                fs.WriteLine($@"                images/{type}/{i}-3x.jpg 1024w,");
                fs.WriteLine($@"                images/{type}/{i}-4x.jpg 1366w""");
                fs.WriteLine($@"         sizes=""(max-width:480px) 100vw, (max-width:768px) 224px, 320px""");
                if (i > lazyloading)
                    fs.WriteLine($@"         src=""images/{type}/{i}-1x.jpg"" alt=""{type} image {i}"" loading=""lazy""/>");
                else
                    fs.WriteLine($@"         src=""images/{type}/{i}-1x.jpg"" alt=""{type} image {i}"" />");

                fs.WriteLine($@"</a>");
            }

            // 640, 768, 1024, 1366, 1600, 1920
        }
    }
}
