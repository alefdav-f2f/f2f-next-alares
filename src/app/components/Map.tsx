'use client'
import React, { useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader';
import iconAlares from '@/img/alares-icon.png';
import StoreService from '../services/api/store-service';
import RegexService from '../services/validations/regex.service';

export default function Map() {

    const mapRef = React.useRef<HTMLDivElement>(null);
    const [storeList, setStoreList] = useState<any>([])

    async function initMap() {

        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
            version: 'weekly'
        });

        const { Map } = await loader.importLibrary('maps');

        const position = {
            lat: -12.386042,
            lng: -42.345148
        }

        const mapOptions: google.maps.MapOptions = {
            center: position,
            zoom: 5,
        }

        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        const icon = {
            url: "https://storage.googleapis.com/alaresspace/Site%20Alares/%C3%8Dcones/alares_marker2.png ",
            scaledSize: new google.maps.Size(35, 45), // scaled size
        };
        console.log(storeList)

        const response = await StoreService.combolist();

        if (response) {
            const data = response.data;
            setStoreList(data);

            data?.map((city: any) => {

                const positionStore = {
                    lat: Number(city.latitude),
                    lng: Number(city.longitude)
                }

                const marker = new google.maps.Marker({
                    position: positionStore,
                    map,
                    title: city.name,
                    icon: icon,
                });

                const header = document.createElement('div');
                const newContent = document.createTextNode(`${city.name}`);
                header.setAttribute('style', 'font-weight: bold; font-size: 20px')
                header.appendChild(newContent)
                const search_address = `https://www.google.com/maps/search/?api=1&query=${city.address}`;
                const content =
                    `<div style="padding-right: 25px;">
                        <div style="margin-bottom: 8px">
                        <span id="address-${city.id}">${city.address}</span><br>
                        </div>
                        <div>
                        <a rel="canonical" href="${search_address}" target="_blank" style="margin-bottom: 5px">
                        <button style="padding: 2px 5px; background-color: #008CBA; color: white; border: none; cursor: pointer;">
                            Ver com Maps
                        </button>
                        </a>
                        </div>
                        <div>
                        <button id="copy-btn-${city.id}" style="padding: 2px 3px; color: #008CBA; border: none; cursor: pointer;">
                            Copiar Endereço
                        </button>
                        </div>
                        </div>`;



                const infowindow = new google.maps.InfoWindow({
                    headerContent: header,
                    content: content,
                    maxWidth: 250
                });

                marker.addListener("click", () => {
                    infowindow.open(map, marker);
                });

                google.maps.event.addListenerOnce(infowindow, 'domready', () => {
                    const copyButton = document.getElementById(`copy-btn-${city.id}`);
                    const addressElement = document.getElementById(`address-${city.id}`);

                    if (copyButton && addressElement) {
                        copyButton.addEventListener('click', () => {
                            const address = addressElement.innerText;

                            // Copia o endereço para a área de transferência
                            navigator.clipboard.writeText(address).then(() => {
                                alert('Endereço copiado!');
                            }).catch(err => {
                                console.error('Erro ao copiar o endereço: ', err);
                            });
                        });
                    }
                });
            })
        }

    }

    React.useEffect(() => {
        initMap();
    }, [])

    return (
        <div>
            <div className='rounded-t-3xl h-[150px] text-center bg-[#271645] pt-10'>
                <span className='text-sub text-4xl'>Onde estamos</span><br />
                <span className='text-white'>A Alares está presente em mais de 100 cidades do Brasil. Encontre uma loja</span>
            </div>
            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1881289.110680694!2d-47.92425550235604!3d-22.935756864729623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cec1afbc7e03b1%3A0x585acb435ba94c02!2sAlares%20Internet!5e0!3m2!1spt-BR!2sbr!4v1712927765280!5m2!1spt-BR!2sbr" width="100%" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}

            <div style={{ height: '600px' }} ref={mapRef} />
        </div>
    )
}
