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
        ReadyForReview = 4,
        Running = 5,
        Done = 6,
        Error = 7
    }
}
