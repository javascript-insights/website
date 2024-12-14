self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-save-document') {
      // Handle the sync event here
      // Maybe save that important document!
    }
  });