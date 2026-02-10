import { useState } from 'react';
import { Navbar, Sidebar, Card, Modal, Dropdown } from '@org/shop-shared-ui';
import './app.css';

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');

  const navItems = [
    { label: 'Home', active: true },
    { label: 'Components', onClick: () => console.log('Components clicked') },
    { label: 'Documentation', onClick: () => console.log('Docs clicked') },
    { label: 'About', onClick: () => console.log('About clicked') }
  ];

  const sidebarItems = [
    {
      id: 'components',
      label: 'Components',
      icon: '🧩',
      children: [
        { id: 'navbar', label: 'Navbar', onClick: () => console.log('Navbar') },
        { id: 'sidebar', label: 'Sidebar', onClick: () => console.log('Sidebar') },
        { id: 'card', label: 'Card', onClick: () => console.log('Card') },
        { id: 'modal', label: 'Modal', onClick: () => console.log('Modal') },
        { id: 'dropdown', label: 'Dropdown', onClick: () => console.log('Dropdown') }
      ]
    },
    {
      id: 'examples',
      label: 'Examples',
      icon: '📝',
      children: [
        { id: 'basic', label: 'Basic Usage', onClick: () => console.log('Basic') },
        { id: 'advanced', label: 'Advanced', onClick: () => console.log('Advanced') }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      onClick: () => console.log('Settings clicked')
    }
  ];

  const dropdownOptions = [
    { value: 'option1', label: 'Prima opzione' },
    { value: 'option2', label: 'Seconda opzione' },
    { value: 'option3', label: 'Terza opzione', disabled: true },
    { value: 'option4', label: 'Quarta opzione' }
  ];

  return (
    <div className="app">
      <Navbar 
        brand="OuldMohand UI" 
        items={navItems} 
        theme="light"
        sticky
      />
      
      <Sidebar 
        items={sidebarItems}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <main className="app-main" style={{ marginLeft: sidebarOpen ? '280px' : '0px' }}>
        <div className="container">
          <h1>OuldMohand UI - Component Library</h1>
          <p>Una collezione di 5 componenti utili per sviluppatori React/TypeScript</p>
          
          <div className="components-grid">
            <Card 
              title="Navbar Component" 
              subtitle="Barra di navigazione responsive"
              hoverable
              shadow="medium"
            >
              <p>Navbar con supporto per temi chiari/scuri, menu responsive e elementi di navigazione configurabili.</p>
            </Card>
            
            <Card 
              title="Sidebar Component" 
              subtitle="Pannello laterale pieghevole"
              hoverable
              shadow="medium"
            >
              <p>Sidebar con menu ad albero, icone personalizzabili e stati espansi/contratti.</p>
            </Card>
            
            <Card 
              title="Card Component" 
              subtitle="Container flessibile"
              hoverable
              shadow="medium"
            >
              <p>Card component con header, footer, opzioni hover e diverse dimensioni di padding e shadow.</p>
            </Card>
            
            <Card 
              title="Modal Component" 
              subtitle="Finestra modale"
              hoverable
              shadow="medium"
            >
              <p>Modal con portals, dimensioni configurabili, chiusura ESC e overlay.</p>
              <div style={{ marginTop: '16px' }}>
                <button 
                  className="demo-button"
                  onClick={() => setModalOpen(true)}
                >
                  Apri Modal
                </button>
              </div>
            </Card>
            
            <Card 
              title="Dropdown Component" 
              subtitle="Menu a tendina"
              hoverable
              shadow="medium"
            >
              <p>Dropdown con ricerca, opzioni disabilitate, separatori e selezione multipla.</p>
              <div style={{ marginTop: '16px' }}>
                <Dropdown
                  options={dropdownOptions}
                  value={dropdownValue}
                  onSelect={setDropdownValue}
                  placeholder="Seleziona un'opzione..."
                  searchable
                />
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal di Esempio"
        size="medium"
        footer={
          <div>
            <button className="demo-button secondary" onClick={() => setModalOpen(false)}>
              Annulla
            </button>
            <button className="demo-button" onClick={() => setModalOpen(false)}>
              Conferma
            </button>
          </div>
        }
      >
        <p>Questo è un esempio di modal component. Puoi chiuderla premendo ESC, cliccando sull'overlay o sui pulsanti.</p>
        <p>Il modal supporta diverse dimensioni (small, medium, large, fullscreen) e può contenere qualsiasi contenuto React.</p>
      </Modal>
    </div>
  );
}

export default App;
