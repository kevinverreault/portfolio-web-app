using System.IO;

namespace Portfolio.HtmlGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            var type = "faune";
            //var output = $"{type}html.txt";
            var output = $"faunehtml.txt";
            if (File.Exists(output))
            {
                File.Delete(output);
            }

            using var fs = new StreamWriter(File.Create(output));
            int galleryItems = 32;
            int lazyloading = 20;
            for (var i = 1; i <= galleryItems; ++i)
            {
                fs.WriteLine($@"<a href=""images/{type}/{i}-1600w.jpg"" data-fancybox=""portfolio"">");
                fs.WriteLine($@"    <img srcset=""images/{type}/{i}-320w.jpg 320w,");
                fs.WriteLine($@"                images/{type}/{i}-640w.jpg 640w,");
                fs.WriteLine($@"                images/{type}/{i}-1024w.jpg 1024w,");
                fs.WriteLine($@"                images/{type}/{i}-1600w.jpg 1600w""");
                fs.WriteLine($@"         sizes=""(max-width:1024px) 50vw, 30vw""");
                if (i > lazyloading)
                    fs.WriteLine($@"         src=""images/{type}/{i}-640w.jpg"" alt=""{type} image {i}"" loading=""lazy""/>");
                else
                    fs.WriteLine($@"         src=""images/{type}/{i}-640w.jpg"" alt=""{type} image {i}"" />");
                
                fs.WriteLine($@"</a>");
            }
        }
    }
}
