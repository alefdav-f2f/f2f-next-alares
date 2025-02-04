import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { register } from "swiper/element/bundle";
import { GoogleTagManager } from "@next/third-parties/google";

register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import localFont from "next/font/local";
import NoSsrWrapper from "./no-ssr-wrapper";
import { Suspense } from "react";
import LoadingAlares from "./components/loadings/LoadingAlares";
import Script from "next/script";

const myFont = localFont({
  src: [
    {
      path: "../fonts/Carbona-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

const description =
  "Consulte suas faturas em aberto e emita rapidamente a segunda via do boleto do seu plano de internet Alares.";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_WEB_URL}`),
  description: description,
  title: {
    default: `Alares | Internet que te leva mais longe`,
    template: "Alares | Internet que te leva mais longe",
  },
  openGraph: {
    description: description,
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_WEB_URL,
    siteName: "Alares Internet",
  },
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* <GoogleTagManager gtmId="GTM-WWQTC27" /> */}

<Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WWQTC27');
          `,
        }}
      />
      <head>
        <link rel="canonical" href="https://www.alaresinternet.com.br" />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <meta
          name="adopt-website-id"
          content="d34f2f1d-1ebe-4450-a522-7ba40e653548"
        />
        <script
          src="//tag.goadopt.io/injector.js?website_code=d34f2f1d-1ebe-4450-a522-7ba40e653548"
          className="adopt-injector"
        ></script>

        {/* VWO Async SmartCode */}
        <link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />
        <Script id="vwo-code" strategy="afterInteractive">
          {`
            window._vwo_code || (function() {
              var account_id=977859,
              version=2.1,
              settings_tolerance=2000,
              hide_element='body',
              hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;transition:none !important;',
              f=false,w=window,d=document,v=d.querySelector('#vwoCode'),cK='_vwo_'+account_id+'_settings',cc={};
              try{var c=JSON.parse(localStorage.getItem('_vwo_'+account_id+'_config'));cc=c&&typeof c==='object'?c:{}}catch(e){}
              var stT=cc.stT==='session'?w.sessionStorage:w.localStorage;code={
                nonce:v&&v.nonce,
                use_existing_jquery:function(){return typeof use_existing_jquery!=='undefined'?use_existing_jquery:undefined},
                library_tolerance:function(){return typeof library_tolerance!=='undefined'?library_tolerance:undefined},
                settings_tolerance:function(){return cc.sT||settings_tolerance},
                hide_element_style:function(){return'{'+(cc.hES||hide_element_style)+'}'},
                hide_element:function(){if(performance.getEntriesByName('first-contentful-paint')[0]){return''}return typeof cc.hE==='string'?cc.hE:hide_element},
                getVersion:function(){return version},
                finish:function(e){if(!f){f=true;var t=d.getElementById('_vis_opt_path_hides');if(t)t.parentNode.removeChild(t);if(e)(new Image).src='https://dev.visualwebsiteoptimizer.com/ee.gif?a='+account_id+e}},
                finished:function(){return f},
                addScript:function(e){var t=d.createElement('script');t.type='text/javascript';if(e.src){t.src=e.src}else{t.text=e.text}v&&t.setAttribute('nonce',v.nonce);d.getElementsByTagName('head')[0].appendChild(t)},
                load:function(e,t){var n=this.getSettings(),i=d.createElement('script'),r=this;t=t||{};
                if(n){i.textContent=n;d.getElementsByTagName('head')[0].appendChild(i);if(!w.VWO||VWO.caE){stT.removeItem(cK);r.load(e)}}else{var o=new XMLHttpRequest;o.open('GET',e,true);o.withCredentials=!t.dSC;o.responseType=t.responseType||'text';o.onload=function(){if(t.onloadCb){return t.onloadCb(o,e)}if(o.status===200||o.status===304){w._vwo_code.addScript({text:o.responseText})}else{w._vwo_code.finish('&e=loading_failure:'+e)}};o.onerror=function(){if(t.onerrorCb){return t.onerrorCb(e)}w._vwo_code.finish('&e=loading_failure:'+e)};o.send()}},
                getSettings:function(){try{var e=stT.getItem(cK);if(!e){return}e=JSON.parse(e);if(Date.now()>e.e){stT.removeItem(cK);return}return e.s}catch(e){return}},
                init:function(){if(d.URL.indexOf('__vwo_disable__')>-1)return;var e=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){w._vwo_code.finish();stT.removeItem(cK)},e);var t;if(this.hide_element()!=='body'){t=d.createElement('style');var n=this.hide_element(),i=n?n+this.hide_element_style():'',r=d.getElementsByTagName('head')[0];t.setAttribute('id','_vis_opt_path_hides');v&&t.setAttribute('nonce',v.nonce);t.setAttribute('type','text/css');if(t.styleSheet)t.styleSheet.cssText=i;else t.appendChild(d.createTextNode(i));r.appendChild(t)}else{t=d.getElementsByTagName('head')[0];var i=d.createElement('div');i.style.cssText='z-index: 2147483647 !important;position: fixed !important;left: 0 !important;top: 0 !important;width: 100% !important;height: 100% !important;background: white !important;';i.setAttribute('id','_vis_opt_path_hides');i.classList.add('_vis_hide_layer');t.parentNode.insertBefore(i,t.nextSibling)}var o=window._vis_opt_url||d.URL,s='https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(o)+'&vn='+version;if(w.location.search.indexOf('_vwo_xhr')!==-1){this.addScript({src:s})}else{this.load(s+'&x=true')}}};
              w._vwo_code=code;code.init();
            })();
            (function(){
              var i=window;
              function t(){
                if(i._vwo_code){
                  var e=t.hidingStyle=document.getElementById('_vis_opt_path_hides')||t.hidingStyle;
                  if(!i._vwo_code.finished()&&!_vwo_code.libExecuted&&(!i.VWO||!VWO.dNR)){
                    if(!document.getElementById('_vis_opt_path_hides')){
                      document.getElementsByTagName('head')[0].appendChild(e);
                    }
                    requestAnimationFrame(t);
                  }
                }
              }
              t();
            })();
          `}
        </Script>
        {/* End VWO Async SmartCode */}
      </head>

      <body className={myFont.className}>
        <h1 className="text-[0px]">Alares | Internet que te leva mais longe</h1>
        <Toaster position="top-right" />
        <Suspense
          fallback={
            <>
              <div className="h-[500px] flex justify-center items-center">
                <LoadingAlares />
              </div>
            </>
          }
        >
          <section className="max-w-screen">{children}</section>
        </Suspense>
      </body>
    </html>
  );
}
