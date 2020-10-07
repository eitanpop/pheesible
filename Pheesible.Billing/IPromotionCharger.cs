using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pheesible.Billing.DTO;

namespace Pheesible.Billing
{
    public interface IPromotionCharger
    {
        Task<long> Bill(Promotion promotion);
    }
}
