import React, { useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';

function MyPDFViewer() {
  useEffect(() => {
    const viewerId = `viewer-${Math.random().toString(36).substr(2, 9)}`; // Generate a unique ID
    const viewerElement = document.createElement('div');
    viewerElement.id = viewerId;
    document.getElementById('viewer-container')!.appendChild(viewerElement);

    WebViewer(
      {
        path: '/src/webviewer-lib/MyPDFViewer/webviewer/lib',
        initialDoc: 'https://suprabhaatham-cms.s3.eu-west-2.amazonaws.com/epaper/2023-10-2717%3A10%3A34SUP%20P01.pdf',
      },
      viewerElement
    ).then((instance) => {
      const { docViewer } :any= instance;

      docViewer.on('documentLoaded', async () => {
        const doc = docViewer.getDocument();
        const page = await doc.getPage(1);

        const mediaBox = await page.getMediaBox();
        mediaBox.x1 -= 100; // Adjust the cropping values as needed
        mediaBox.x2 -= 100;

        await page.setMediaBox(mediaBox);
        docViewer.refreshAll();
      });
    });

    return () => {
      // Cleanup code if needed
      viewerElement.remove();
    };
  }, []);

  return <div id="viewer-container" style={{ height: '100vh' }}></div>;
}

export default MyPDFViewer;
