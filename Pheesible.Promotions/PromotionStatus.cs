using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Promotions
{
    public enum PromotionStatus
    {
        Draft = 1,
        WaitingForPaymentConfirmation = 2,
        ReadyForAdPublish = 3,
        Running = 4,
        Done = 5
    }
}
