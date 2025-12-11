import DashboardImg from "@/assets/images/info/002-CATEDRAL-METROPOLITANA.webp";
import { ScrollTo } from "@/helpers";

export default function Dashboard() {

    function gotoScrool(e: any) {
        setTimeout(() => {
            ScrollTo(e);
        }, 500);
    }


    return (
        <div className="relative w-full h-[400px] sm:h-[750px]">
            {/* Imagem de fundo */}
            <img
                className="absolute inset-0 w-full h-full object-cover"
                src={DashboardImg}
                alt="Dashboard"
            />

            {/* Overlay escuro para melhorar legibilidade do texto */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Conteúdo do texto */}
            <div className="relative">
                <div className="container">
                    <div className="text-4xl md:text-5xl font-bold mb-4 text-white pt-60">
                        Descubra Brasília<br /> como você nunca viu.
                    </div>
                    <div className="text-lg md:text-xl max-w-2xl text-white">
                        Passeios completos, imersivos e pensados para<br /> transformar a sua visita.
                    </div>
                    <div className="pt-10">
                        <button
                            onClick={() => gotoScrool("#destinos")}
                            className="bg-gradient-to-r cursor-pointer from-azul-1 to-blue-700 hover:from-blue-600 hover:to-blue-700 text-white hover:text-amarelo-1 font-bold px-8 py-4 rounded-lg uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            Veja nossos tours
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}