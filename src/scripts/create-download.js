import FileSaver from 'file-saver'
import SVGO from 'svgo'

const svgo = new SVGO( {
  multipass: true,
  plugins: [
    {
      cleanupAttrs: true
    },
    {
      removeDoctype: true
    },
    {
      removeXMLProcInst: true
    },
    {
      removeComments: true
    },
    {
      removeMetadata: true
    },
    {
      removeTitle: true
    },
    {
      removeDesc: true
    },
    {
      removeUselessDefs: true
    },
    {
      removeEditorsNSData: true
    },
    {
      removeEmptyAttrs: true
    },
    {
      removeHiddenElems: true
    },
    {
      removeEmptyText: true
    },
    {
      removeEmptyContainers: true
    },
    {
      removeViewBox: false
    },
    {
      cleanUpEnableBackground: true
    },
    {
      convertStyleToAttrs: true
    },
    {
      convertColors: true
    },
    {
      convertPathData: true
    },
    {
      convertTransform: true
    },
    {
      removeUnknownsAndDefaults: true
    },
    {
      removeNonInheritableGroupAttrs: true
    },
    {
      removeUselessStrokeAndFill: true
    },
    {
      removeUnusedNS: true
    },
    {
      cleanupIDs: true
    },
    {
      cleanupNumericValues: true
    },
    {
      moveElemsAttrsToGroup: true
    },
    {
      moveGroupAttrsToElems: true
    },
    {
      collapseGroups: true
    },
    {
      removeRasterImages: false
    },
    {
      mergePaths: true
    },
    {
      convertShapeToPath: false
    },
    {
      sortAttrs: true
    },
    {
      transformsWithOnePath: false
    },
    {
      removeDimensions: false
    },
    {
      removeAttrs: false
    }
  ]
} )

////////////
// Used to make the filename pretty
function prettyName ( uglyName ) {
  return uglyName.replace( /[^a-z0-9]/gi, '-' ).toLowerCase()
}

//////////////////////
// Make a filename systematically
const getFilename = i => {
  let filename = 'gobble'
  if ( i.alt ) {
    filename = prettyName( i.alt )
  } else if ( i.id ) {
    filename = prettyName( i.id )
  } else if ( window.document.title ) {
    filename = prettyName( window.document.title )
  }
  i.filename = filename
}

//////////////////
// Export the SVG for download
export const createDownload = svg => {
  getFilename( svg )
  svgo.optimize( svg.source ).then( function ( result ) {
    let blob = new Blob( [ result.data ], { type: 'text/xml' } )
    FileSaver.saveAs( blob, `${ svg.filename }.svg` )
  } )
}
