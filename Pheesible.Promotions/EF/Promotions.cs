using System;
using System.Collections.Generic;

namespace Pheesible.Promotions.EF
{
    public partial class Promotions
    {
        public Promotions()
        {
            Ads = new HashSet<Ads>();
            Facebook = new HashSet<Facebook>();
            Features = new HashSet<Features>();
            Leads = new HashSet<Leads>();
            SellingPoints = new HashSet<SellingPoints>();
        }

        public int Id { get; set; }
        public string SubId { get; set; }
        public string Title { get; set; }
        public string ElevatorPitch { get; set; }
        public string Logo { get; set; }
        public string Banner { get; set; }
        public string IdentityId { get; set; }
        public string ImageOne { get; set; }
        public string ImageTwo { get; set; }
        public string ImageThree { get; set; }
        public string FreeText { get; set; }
        public string TagLine { get; set; }
        public int TemplateId { get; set; }
        public int? StatusId { get; set; }
        public string Name { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? StartDate { get; set; }
        public string Charge { get; set; }
        public bool IsActive { get; set; }

        public virtual Templates Template { get; set; }
        public virtual ICollection<Ads> Ads { get; set; }
        public virtual ICollection<Facebook> Facebook { get; set; }
        public virtual ICollection<Features> Features { get; set; }
        public virtual ICollection<Leads> Leads { get; set; }
        public virtual ICollection<SellingPoints> SellingPoints { get; set; }
    }
}
