using System.Threading.Tasks;

namespace Pheesible.Integrations.AWS
{
    public interface IS3
    {
        Task<byte[]> GetObject(string bucketName, string key);
    }
}