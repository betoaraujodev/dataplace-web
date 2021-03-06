export const dataMenu = 
[
    {
        title: "Analytics",
        page: "/admin/analytics",
        icon: "chart-bar",
    },
    {
        title: "Negociações",
        page: "/admin/negociacoes",
        icon: "dollar-sign",
    },
    {
        title: "Imóveis",
        page: "/admin/imoveis",
        icon: "door-open",
    },
    {
        title: "Contatos",
        page: "/admin/contatos",
        icon: "user",
        sub: [
            {
                name: "Proprietários",
                page: "proprietarios",
            },
            {
                name: "Clientes",
                page: "clientes",
            },
            {
                name: "Leads",
                page: "leads",
            }
        ]
    },
    {
        title: "Prédios",
        page: "/admin/predios",
        icon: "city",
        active: false,
    },
    {
        title: "Agenda",
        page: "/admin/agenda",
        icon: "calendar",
        active: false
    },
    {
        title: "Configurações",
        page: "/admin/configuracoes",
        icon: "cogs",
        active: false,
        sub: [
            {
                name: "Plataforma",
                page: "plataforma",
                active: false
            }
        ]
    }
];