import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import NamespaceSelectionModal from './components/NamespaceSelectionModal';
import { storage } from './services/storage';
import { NamespaceKey } from './constants/namespaces';
import './App.css';

function App() {
  const [hasSelectedNamespace, setHasSelectedNamespace] = useState(false);

  const handleNamespaceSelect = (namespace: NamespaceKey) => {
    // Update config with selected namespace
    const currentConfig = storage.getConfig();
    storage.saveConfig({
      ...currentConfig,
      namespace: namespace
    });
    setHasSelectedNamespace(true);
  };

  return (
    <div className="App">
      {!hasSelectedNamespace && (
        <NamespaceSelectionModal onSelect={handleNamespaceSelect} />
      )}
      {hasSelectedNamespace && <ChatInterface />}
    </div>
  );
}

export default App;
