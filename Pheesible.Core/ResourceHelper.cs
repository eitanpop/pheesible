using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Pheesible.Core
{
    public static class ResourceHelper
    {
        public static async Task<string> ReadResource(string name, Assembly assembly )
        {
            string resourcePath = name;
            // Format: "{Namespace}.{Folder}.{filename}.{Extension}"
            await using Stream stream = assembly.GetManifestResourceStream(resourcePath);
            if (stream == null)
                throw new FileNotFoundException("Cannot find file.", name);
            using StreamReader reader = new StreamReader(stream);
            return await reader.ReadToEndAsync();
        }
    }
}
