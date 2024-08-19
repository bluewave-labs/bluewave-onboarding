export const ACTIVITY_TYPES_INFO = {
    HINTS: "hints",
    POPUPS: "popups",
    BANNERS: "banners",
    HELPERLINKS: "helper links",
    TOURS: "tours",
};

export const activityInfoData = {
    [ACTIVITY_TYPES_INFO.POPUPS]: {
        heading: "What is a popup?",
        paragraph: "Popups can enhance user experience, communication, and engagement within a SaaS dashboard when used effectively Popups can display promotional messages, special offers, or discounts to encourage users to upgrade their subscription, purchase additional features, or engage more with the software They can also notify users about important updates, announcements, or events related to the software or their account.",
        buttonText: "Create a new popup",
        title: "All popups"
    },
    [ACTIVITY_TYPES_INFO.BANNERS]: {
        heading: "What is a banner?",
        paragraph: "A banner is a strip or bar typically displayed at the top or bottom of the user interface. Banners can be used to convey important announcements such as new features, product updates, scheduled maintenance, or system downtime. They can also display promotional messages, special offers, discounts, or upcoming events to attract users' attention and encourage engagement. Banners can effectively communicate important information to users without disrupting their workflow within the SaaS application",
        buttonText: "Create a new banner",
        title: "All banners"
    },
};
