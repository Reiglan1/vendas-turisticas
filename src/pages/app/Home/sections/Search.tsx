import { useState, useEffect } from "react";
import BrasiliNoturnaImg from "@/assets/images/info/Brasilia-Noturna.webp";
import BrasiliaMemoriaVivaImg from "@/assets/images/info/Brasilia-Memoria-Viva.webp";
import BrasiliaFamiliaImg from "@/assets/images/info/Brasilia-em-Familia.webp";
import CatedralMetropolitanaImg from "@/assets/images/info/002-CATEDRAL-METROPOLITANA.webp";
import EsplanadaDosMinisteriosImg from "@/assets/images/info/006-ESPLANADA-DOS-MINISTERIOS.webp";
import CatedralPalaciosImg from "@/assets/images/info/Catedral.webp";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";

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
    price: number;
    fullDescription?: string;
    included?: string[];
    notIncluded?: string[];
    observations?: string[];
    schedule?: string;
    maxParticipants?: number;
}

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("price-asc");
    const [showAll, setShowAll] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
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
            fullDescription: "Descubra Brasília sob uma nova perspectiva quando o sol se põe. Este tour exclusivo combina a magia da capital iluminada com uma experiência gastronômica inesquecível no Pontão do Lago Sul. Você vai conhecer os principais monumentos da cidade sob o céu estrelado e depois desfrutar de um jantar com vista privilegiada para o Lago Paranoá.",
            included: [
                "Transporte em veículo climatizado",
                "Guia turístico especializado",
                "Paradas fotográficas nos principais pontos",
                "Jantar no restaurante do Pontão (entrada + prato principal)",
                "Água mineral durante o passeio"
            ],
            notIncluded: [
                "Bebidas alcoólicas",
                "Sobremesa",
                "Seguro viagem",
                "Despesas pessoais"
            ],
            observations: [
                "Recomendamos roupas leves e confortáveis",
                "Leve câmera fotográfica",
                "Tour sujeito a condições climáticas",
                "Reserva com antecedência mínima de 48h"
            ],
            schedule: "Saída às 18h00 | Retorno previsto às 21h30",
            maxParticipants: 15
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

    // Bloqueia scroll quando modal está aberto
    useEffect(() => {
        if (selectedDestination) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup: restaura o scroll quando o componente desmontar
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedDestination]);

    return (
        <section id="destinos" className="py-16 bg-white">
            <div className="container">
                {/* Barra de pesquisa */}
                <ScrollReveal animation="fade-in-up">
                    <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="flex-1 flex gap-2">
                        <input
                            type="text"
                            placeholder="Informe seu destino"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-2 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                        />
                        <button className="bg-gradient-to-r cursor-pointer from-azul-1 to-blue-700 hover:from-blue-600 hover:to-blue-700 text-white hover:text-amarelo-1 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
                </ScrollReveal>

                {/* Grid de cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedDestinations.map((destination, index) => (
                        <ScrollReveal 
                            key={destination.id}
                            animation="fade-in-up"
                            delay={((index % 3) * 100) as any}
                        >
                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
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
                                <button 
                                    onClick={() => setSelectedDestination(destination)}
                                    className="w-full cursor-pointer bg-gradient-to-r from-azul-1 to-blue-700 hover:from-blue-600 hover:to-blue-700 text-white hover:text-amarelo-1 font-bold py-4 rounded-lg uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-6"
                                >
                                    Saiba mais
                                </button>
                            </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Botão Ver Mais / Ver Menos */}
                {hasMore && filteredDestinations.length > 0 && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="bg-gradient-to-r from-azul-1 to-blue-700 hover:from-blue-600 hover:to-blue-700 text-white hover:text-amarelo-1 font-bold px-12 py-4 rounded-lg uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
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

            {/* Modal de Detalhes */}
            {selectedDestination && (
                <div 
                    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
                    onClick={() => setSelectedDestination(null)}
                >
                    <div 
                        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header do Modal com Imagem */}
                        <div className="relative h-80">
                            <img 
                                src={selectedDestination.image} 
                                alt={selectedDestination.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            
                            {/* Botão Fechar */}
                            <button
                                onClick={() => setSelectedDestination(null)}
                                className="absolute cursor-pointer top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Tag e Título */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <span className="bg-blue-900 px-4 py-2 rounded-lg font-bold text-sm inline-block mb-4">
                                    {selectedDestination.tag}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold uppercase">
                                    {selectedDestination.title}
                                </h2>
                            </div>
                        </div>

                        {/* Conteúdo do Modal */}
                        <div className="p-8">
                            {/* Informações Principais */}
                            <div className="grid md:grid-cols-3 gap-6 mb-8 pb-8 border-b">
                                <div className="text-center">
                                    <p className="text-blue-500 font-bold text-sm mb-2">DURAÇÃO</p>
                                    <p className="text-2xl font-bold text-gray-800">{selectedDestination.duration}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-blue-500 font-bold text-sm mb-2">PREÇO POR PESSOA</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        R$ {selectedDestination.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-blue-500 font-bold text-sm mb-2">GUIA</p>
                                    <p className="text-xl font-semibold text-gray-800">{selectedDestination.departures}</p>
                                </div>
                            </div>

                            {/* Descrição Completa */}
                            {selectedDestination.fullDescription && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Sobre o Tour</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {selectedDestination.fullDescription}
                                    </p>
                                </div>
                            )}

                            {/* Horário e Participantes */}
                            {(selectedDestination.schedule || selectedDestination.maxParticipants) && (
                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    {selectedDestination.schedule && (
                                        <div className="bg-blue-50 p-6 rounded-xl">
                                            <div className="flex items-center gap-3 mb-2">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <h4 className="font-bold text-gray-800">Horário</h4>
                                            </div>
                                            <p className="text-gray-700">{selectedDestination.schedule}</p>
                                        </div>
                                    )}
                                    {selectedDestination.maxParticipants && (
                                        <div className="bg-blue-50 p-6 rounded-xl">
                                            <div className="flex items-center gap-3 mb-2">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <h4 className="font-bold text-gray-800">Grupo</h4>
                                            </div>
                                            <p className="text-gray-700">Máximo {selectedDestination.maxParticipants} participantes</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* O que está incluído */}
                            {selectedDestination.included && selectedDestination.included.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        O que está incluído
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedDestination.included.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* O que NÃO está incluído */}
                            {selectedDestination.notIncluded && selectedDestination.notIncluded.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        O que não está incluído
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedDestination.notIncluded.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Observações */}
                            {selectedDestination.observations && selectedDestination.observations.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Observações Importantes
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedDestination.observations.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Botões de Ação */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                                <button className="flex-1 cursor-pointer bg-gradient-to-r from-azul-1 to-blue-700 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                    Reservar Agora
                                </button>
                                <button className="flex-1 cursor-pointer border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg uppercase tracking-wider transition-all duration-300">
                                    Entrar em Contato
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}   