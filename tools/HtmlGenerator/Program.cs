using System;
using System.IO;
using System.Text;
using System.Windows;

namespace Portfolio.HtmlGenerator
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            var type = args[0];
            int galleryItems = Convert.ToInt32(args[1]);

            int lazyloading = 20;

            //var output = "html.txt";
            //if (File.Exists(output))
            //{
            //    File.Delete(output);
            //}
            //using var fs = new StreamWriter(File.Create(output));
            //for (var i = 1; i <= galleryItems; ++i)
            //{
            //    fs.WriteLine($@"<a href=""images/{type}/{i}-5x.jpg"" data-fancybox=""portfolio"">");
            //    fs.WriteLine($@"    <img srcset=""images/{type}/{i}-1x.jpg 320w,");
            //    fs.WriteLine($@"                images/{type}/{i}-2x.jpg 640w,");
            //    fs.WriteLine($@"                images/{type}/{i}-3x.jpg 1024w,");
            //    fs.WriteLine($@"                images/{type}/{i}-4x.jpg 1366w""");
            //    fs.WriteLine($@"         sizes=""(max-width:480px) 100vw, (max-width:768px) 224px, 320px""");
            //    if (i > lazyloading)
            //        fs.WriteLine($@"         src=""images/{type}/{i}-1x.jpg"" alt=""{type} image {i}"" loading=""lazy""/>");
            //    else
            //        fs.WriteLine($@"         src=""images/{type}/{i}-1x.jpg"" alt=""{type} image {i}"" />");

            //    fs.WriteLine($@"</a>");
            //}

            var sw = new StringBuilder();
            for (var i = 1; i <= galleryItems; ++i)
            {
                sw.AppendLine($@"<a href=""images/{type}/{i}-5x.jpg"" data-fancybox=""portfolio"">");
                sw.AppendLine($@"    <img srcset=""images/{type}/{i}-1x.jpg 320w,");
                sw.AppendLine($@"                images/{type}/{i}-2x.jpg 640w,");
                sw.AppendLine($@"                images/{type}/{i}-3x.jpg 1024w,");
                sw.AppendLine($@"                images/{type}/{i}-4x.jpg 1366w""");
                sw.AppendLine($@"         sizes=""(max-width:480px) 100vw, (max-width:768px) 224px, 320px""");
                if (i > lazyloading)
                    sw.AppendLine($@"         src=""images/{type}/{i}-1x.jpg"" alt=""{type} image {i}"" loading=""lazy""/>");
                else
                    sw.AppendLine($@"         src=""images/{type}/{i}-1x.jpg"" alt=""{type} image {i}"" />");

                sw.AppendLine($@"</a>");
            }

            Clippy.PushStringToClipboard(sw.ToString());


            // 640, 768, 1024, 1366, 1600, 1920
        }
    }
}
