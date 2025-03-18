import {useState, useMemo} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessIcon from '@mui/icons-material/Business';
import usePageTitle from "../../hooks/usePageTitle";
import {Modal, ProjectForm} from "../../components";

const Projects = () => {
    usePageTitle("Projets");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Données de test pour les projets avec plusieurs partenaires
    const [projects] = useState(Array(20).fill().map((_, index) => ({
        id: index + 1,
        titre: `Projet ${index + 1}`,
        description: "Description détaillée du projet et de ses objectifs...",
        date_debut: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
        date_fin: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
        partenaires: Array(Math.floor(Math.random() * 12) + 1).fill().map((_, pIndex) => ({
            id: pIndex + 1,
            nom: `Partenaire ${pIndex + 1}`,
            logo: `https://picsum.photos/seed/${index}-${pIndex}/100/100`
        })),
        image: `https://picsum.photos/seed/${index}/400/300`
    })));

    // Liste des partenaires disponibles (simulée)
    const [availablePartners] = useState(Array(20).fill().map((_, index) => ({
        id: index + 1,
        nom: `Partenaire ${index + 1}`,
        logo: `https://picsum.photos/seed/partner-${index}/100/100`
    })));

    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch =
                project.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.partenaires.some(p => p.nom.toLowerCase().includes(searchTerm.toLowerCase()));

            return matchesSearch;
        });
    }, [projects, searchTerm]);

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const currentItems = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(new Date(date));
    };

    // Vérifier si un projet est en cours
    const getProjectStatus = (dateDebut, dateFin) => {
        const now = new Date();
        const start = new Date(dateDebut);
        const end = new Date(dateFin);

        if (now < start) return {label: 'À venir', class: 'bg-purple-100 text-purple-600'};
        if (now > end) return {label: 'Terminé', class: 'bg-gray-100 text-gray-600'};
        return {label: 'En cours', class: 'bg-[#6BA9E6]/10 text-[#6BA9E6]'};
    };

    const handleFormSubmit = (formData) => {
        const newProject = {
            id: projects.length + 1,
            titre: formData.titre,
            description: formData.description,
            date_debut: new Date(formData.date_debut),
            date_fin: new Date(formData.date_fin),
            partenaires: formData.partenaires,
            image: formData.image,
            created_at: new Date().toISOString(),
            created_by: "Scrat1313"
        };

        // Ajouter le nouveau projet au début de la liste
        projects.push(newProject);

        // Fermer le modal
        setIsModalOpen(false);

        // Option : Afficher une notification de succès
        console.log('Projet ajoutée :', newProject);
    };

    return (
        <div className="h-full bg-[#F2F2F2] flex flex-col">
            {/* En-tête */}
            <div className="bg-white rounded-2xl  p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className="text-[#162449] text-2xl font-bold">
                            Projets
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <AssignmentIcon className="h-4 w-4"/>
                            <span>{filteredProjects.length} projets</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6BA9E6] hover:bg-[#1E90FF] text-white rounded-lg transition-all duration-300 group"
                    >
                        <AddIcon className="h-5 w-5 group-hover:rotate-90 transition-transform"/>
                        <span>Nouveau projet</span>
                    </button>
                </div>
            </div>

            {/* Barre de recherche */}
            <div className="bg-white rounded-2xl border-b border-gray-200">
                <div className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                                <input
                                    type="search"
                                    placeholder="Rechercher un projet ou un partenaire..."
                                    className="w-full pl-12 pr-4 py-3 bg-[#F2F2F2] rounded-lg border-transparent focus:border-[#6BA9E6] focus:ring-0 transition-colors"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Toggle view */}
                        <div className="flex rounded-lg bg-[#F2F2F2] p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === 'grid'
                                        ? 'bg-white text-[#6BA9E6] shadow-sm'
                                        : 'text-gray-500 hover:text-[#6BA9E6]'
                                }`}
                            >
                                <ViewModuleIcon className="h-5 w-5"/>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === 'list'
                                        ? 'bg-white text-[#6BA9E6] shadow-sm'
                                        : 'text-gray-500 hover:text-[#6BA9E6]'
                                }`}
                            >
                                <ViewListIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="flex-1 overflow-auto p-6">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {currentItems.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                            >
                                <div className="relative aspect-video">
                                    <img
                                        src={project.image}
                                        alt={project.titre}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-[#162449]/80 to-transparent"/>
                                    <div className="absolute inset-x-4 bottom-4">
                                        <h3 className="text-white font-semibold text-lg line-clamp-2">
                                            {project.titre}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="mb-3">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                            getProjectStatus(project.date_debut, project.date_fin).class
                                        }`}>
                                            {getProjectStatus(project.date_debut, project.date_fin).label}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                        {project.description}
                                    </p>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <CalendarMonthIcon className="h-4 w-4"/>
                                            <span>
                                                {formatDate(project.date_debut)} - {formatDate(project.date_fin)}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <BusinessIcon className="h-4 w-4"/>
                                                <span>Partenaires ({project.partenaires.length})</span>
                                            </div>
                                            <div className="flex -space-x-2">
                                                {project.partenaires.map((partenaire, index) => (
                                                    <img
                                                        key={partenaire.id}
                                                        src={partenaire.logo}
                                                        alt={partenaire.nom}
                                                        title={partenaire.nom}
                                                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                                        <button className="p-2 hover:bg-[#6BA9E6]/10 rounded-lg transition-colors">
                                            <EditIcon className="h-5 w-5 text-[#6BA9E6]"/>
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                            <DeleteIcon className="h-5 w-5 text-red-500"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        {currentItems.map((project, index) => (
                            <div
                                key={project.id}
                                className={`flex items-center gap-4 p-4 hover:bg-[#F2F2F2]/30 transition-colors ${
                                    index !== currentItems.length - 1 ? 'border-b border-gray-100' : ''
                                }`}
                            >
                                <img
                                    src={project.image}
                                    alt={project.titre}
                                    className="h-20 w-28 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-semibold text-[#162449] truncate">
                                            {project.titre}
                                        </h3>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                            getProjectStatus(project.date_debut, project.date_fin).class
                                        }`}>
                                            {getProjectStatus(project.date_debut, project.date_fin).label}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500 line-clamp-1 mb-2">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <CalendarMonthIcon className="h-4 w-4"/>
                                            {formatDate(project.date_debut)}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <BusinessIcon className="h-4 w-4"/>
                                            <div className="flex -space-x-2">
                                                {project.partenaires.map((partenaire) => (
                                                    <img
                                                        key={partenaire.id}
                                                        src={partenaire.logo}
                                                        alt={partenaire.nom}
                                                        title={partenaire.nom}
                                                        className="w-6 h-6 rounded-full border-2 border-white object-cover"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-[#6BA9E6]/10 rounded-lg transition-colors">
                                        <EditIcon className="h-5 w-5 text-[#6BA9E6]"/>
                                    </button>
                                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                        <DeleteIcon className="h-5 w-5 text-red-500"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <div className="inline-flex rounded-lg bg-white shadow-sm">
                            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`
                                        min-w-[40px] h-10 flex items-center justify-center
                                        ${currentPage === page
                                        ? 'bg-[#6BA9E6] text-white'
                                        : 'text-gray-600 hover:bg-[#F2F2F2]'
                                    }
                                        ${page === 1 ? 'rounded-l-lg' : ''}
                                        ${page === totalPages ? 'rounded-r-lg' : ''}
                                        transition-colors duration-200
                                    `}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Ajouter un projet"
                footer={
                    <>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            form="project-form"
                            className="px-4 py-2 bg-[#6BA9E6] text-white rounded-lg hover:bg-[#1E90FF] transition-colors"
                        >
                            Créer le projet
                        </button>
                    </>
                }
            >
                <ProjectForm
                    onSubmit={handleFormSubmit}
                    availablePartners={availablePartners}
                />
            </Modal>
        </div>
    );
};

export default Projects;