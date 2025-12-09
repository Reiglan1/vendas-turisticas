import { useState } from "react";
import BrasiliNoturnaImg from "@/assets/images/info/Brasilia-Noturna.webp";
import BrasiliaMemoriaVivaImg from "@/assets/images/info/Brasilia-Memoria-Viva.webp";
import BrasiliaFamiliaImg from "@/assets/images/info/Brasilia-em-Familia.webp";
import CatedralMetropolitanaImg from "@/assets/images/info/002-CATEDRAL-METROPOLITANA.webp";
import EsplanadaDosMinisteriosImg from "@/assets/images/info/006-ESPLANADA-DOS-MINISTERIOS.webp";
import CatedralPalaciosImg from "@/assets/images/info/Catedral.webp";

interface Destination {
    id: number;
    image: string;
    tag: string;
    title: string;
    description: string;
    location: string;
    duration: string;
    visiting: string;
    departures: string;
    price: number; // preço em reais para ordenação
}

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("price-asc");
    const [showAll, setShowAll] = useState(false);
    const ITEMS_TO_SHOW = 3;

    // Array de destinos - adicione suas imagens aqui
    const destinations: Destination[] = [
        {
            id: 1,
            image: BrasiliNoturnaImg, 
            tag: "POPULAR",
            title: "Brasília Noturna + Gastronomia no Pontão",
            description:
                "Luzes, sabores e reflexos à beira do Lago Paranoá. Um passeio noturno por Brasília que termina com um jantar memorável.",
            location: "Brasil",
            duration: "3h30",
            visiting: "Brasília",
            departures: "Rafael Lima",
            price: 350,
        },
        {
            id: 2,
            image: BrasiliaMemoriaVivaImg, 
            tag: "AVENTURA",
            title: "Tour Brasília Memória Viva – Especial Pioneiros",
            description: "Uma Brasília contada por quem a viu nascer.",
            location: "Brasil",
            duration: "3h",
            visiting: "Brasília",
            departures: "Rafael Lima",
            price: 250,
        },
        {
            id: 3,
            image: BrasiliaFamiliaImg, 
            tag: "AVENTURA",
            title: "Tour Brasília em Família – Roteiro Interativo",
            description: "Uma Brasília lúdica e educativa para todas as idades.",
            location: "Brasil",
            duration: "2h30",
            visiting: "Brasília",
            departures: "Rafael Lima",
            price: 200,
        },
        {
            id: 4,
            image: CatedralMetropolitanaImg, 
            tag: "AVENTURA",
            title: "City Tour Brasília Monumental + Lago Paranoá",
            description: "O clássico com um toque refrescante.",
            location: "Brasil",
            duration: "3h30",
            visiting: "Brasília",
            departures: "Rafael Lima",
            price: 300,
        },
        {
            id: 5,
            image: EsplanadaDosMinisteriosImg, 
            tag: "AVENTURA",
            title: "Tour Brasília Essencial",
            description: "Para quem tem pouco tempo e quer ver muito.",
            location: "Brasil",
            duration: "2h",
            visiting: "Brasília",
            departures: "Rafael Lima",
            price: 150,
        },
        {
            id: 6,
            image: CatedralPalaciosImg, 
            tag: "AVENTURA",
            title: "Tour Brasília Catedral & Palácios por Dentro",
            description: "Um mergulho nos bastidores do poder.",
            location: "Brasil",
            duration: "4h",
            visiting: "Brasília",
            departures: "Rafael Lima",
            price: 400,
        },
    ];

    // Função para converter duração em minutos para ordenação
    const durationToMinutes = (duration: string): number => {
        const hoursMatch = duration.match(/(\d+)h/);
        const minutesMatch = duration.match(/(\d+)(?:min)?$/);
        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
        return hours * 60 + minutes;
    };

    // Função de ordenação
    const sortDestinations = (destinations: Destination[]): Destination[] => {
        const sorted = [...destinations];
        
        switch (sortBy) {
            case "price-asc":
                return sorted.sort((a, b) => a.price - b.price);
            case "price-desc":
                return sorted.sort((a, b) => b.price - a.price);
            case "duration":
                return sorted.sort((a, b) => durationToMinutes(a.duration) - durationToMinutes(b.duration));
            case "name":
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return sorted; // mantém ordem original
        }
    };

    const filteredDestinations = sortDestinations(
        destinations.filter((dest) =>
            dest.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Limita os itens exibidos se showAll for false
    const displayedDestinations = showAll 
        ? filteredDestinations 
        : filteredDestinations.slice(0, ITEMS_TO_SHOW);

    const hasMore = filteredDestinations.length > ITEMS_TO_SHOW;

    return (
        <section className="py-16 bg-white">
            <div className="container">
                {/* Barra de pesquisa */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="flex-1 flex gap-2">
                        <input
                            type="text"
                            placeholder="Informe seu destino"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-2 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                        />
                        <button className="bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:text-amarelo-1 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-6 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700 bg-white cursor-pointer"
                    >
                        {/* <option value="relevance">Organizar</option> */}
                        <option value="price-asc">Menor preço</option>
                        <option value="price-desc">Maior preço</option>
                        <option value="duration">Duração</option>
                        <option value="name">Nome A-Z</option>
                    </select>
                </div>

                {/* Grid de cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedDestinations.map((destination) => (
                        <div
                            key={destination.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col"
                        >
                            {/* Imagem */}
                            <div className="relative h-64 overflow-hidden">
                                {destination.image ? (
                                    <img
                                        src={destination.image}
                                        alt={destination.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-400 flex items-center justify-center">
                                        <p className="text-white text-sm">
                                            Adicione imagem do destino
                                        </p>
                                    </div>
                                )}
                                {/* Tag */}
                                <div className="absolute top-4 left-4 bg-blue-900 text-white px-4 py-2 rounded-lg font-bold text-sm">
                                    {destination.tag}
                                </div>
                            </div>

                            {/* Conteúdo */}
                            <div className="p-6 flex flex-col flex-1">
                                {/* Parte superior - expande/contrai */}
                                <div className="space-y-4 flex-1">
                                    {/* Título */}
                                    <h3 className="text-xl font-bold text-gray-800 transition-colors uppercase">
                                        {destination.title}
                                    </h3>

                                    {/* Descrição */}
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {destination.description}
                                    </p>
                                </div>

                                {/* Informações - sempre alinhadas */}
                                <div className="space-y-4 mt-6">
                                    <p className="text-blue-500 font-semibold text-lg uppercase">
                                        {destination.location}
                                    </p>
                                    {/* Duração */}
                                    <div>
                                        <div className="flex items-center gap-2 text-blue-500 font-bold">
                                            <span className="text-sm">DURAÇÃO</span>
                                        </div>
                                        <p className="text-gray-700 font-semibold mt-1">
                                            {destination.duration}
                                        </p>
                                    </div>

                                    {/* Visitando */}
                                    <div className="pt-2 border-t border-gray-200">
                                        <p className="text-blue-500 font-bold text-sm mb-1">
                                            VISITANDO
                                        </p>
                                        <p className="text-gray-600 text-sm">{destination.visiting}</p>
                                    </div>

                                    {/* Guia */}
                                    <div className="pt-2 border-t border-gray-200">
                                        <p className="text-blue-500 font-bold text-sm mb-1">GUIA</p>
                                        <p className="text-gray-600 text-sm">
                                            {destination.departures}
                                        </p>
                                    </div>
                                </div>

                                {/* Botão - sempre no fundo */}
                                <button className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:text-amarelo-1 font-bold py-4 rounded-lg uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-6">
                                    Saiba mais
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botão Ver Mais / Ver Menos */}
                {hasMore && filteredDestinations.length > 0 && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:text-amarelo-1 font-bold px-12 py-4 rounded-lg uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
                        >
                            {showAll ? (
                                <>
                                    Ver menos
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 15l7-7 7 7"
                                        />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    Ver mais
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Mensagem quando não há resultados */}
                {filteredDestinations.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            Nenhum destino encontrado para "{searchTerm}"
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}   