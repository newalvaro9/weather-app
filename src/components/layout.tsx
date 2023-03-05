import Head from 'next/head'

//Main page /...
export default function Layout({ children, title, withoutContainer }: { children: any, title?: string, withoutContainer?: boolean }) {
    return (
        <>
            <Head>
                <title>{title ? title : "Weather App"}</title>
                {/* <meta name="description" content="" /> */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            {
                withoutContainer ?
                    children
                    : (
                        <div className="main-container">
                            {children} {/* {{{body}}} from handlebars*/}
                        </div>
                    )
            }
        </>
    )
}