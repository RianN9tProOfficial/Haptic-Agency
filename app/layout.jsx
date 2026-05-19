import './globals.css';

export const metadata = {
    title: 'Truus — Creative Development Studio',
    description: 'Truus is a premium creative web development studio specialising in immersive websites, motion systems, and frontend engineering.',
    icons: {
        icon: 'https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68381362603d6402ee03c00e_favicon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
