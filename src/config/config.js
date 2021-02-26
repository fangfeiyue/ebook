export const FONT_SIZE_LIST = [
  { fontSize: '12px' },
  { fontSize: '14px' },
  { fontSize: '16px' },
  { fontSize: '18px' },
  { fontSize: '20px' },
  { fontSize: '22px' },
  { fontSize: '24px' }
]

export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' }
]

export function themeList (vue) {
  return [
    {
      alias: '默认',
      name: 'Default',
      style: {
        body: {
          color: '#4c5059',
          background: '#cecece'
        }
      }
    },
    {
      alias: '雅致',
      name: 'Gold',
      style: {
        body: {
          color: '#5c5b56',
          background: '#c6c2b6'
        }
      }
    }, {
      alias: '护眼',
      name: 'Eye',
      style: {
        body: {
          color: '#404c42',
          background: '#a9c1a9'
        }
      }
    },
    {
      alias: '夜间',
      name: 'Night',
      style: {
        body: {
          color: '#cecece',
          background: '#000000'
        }
      }
    }
  ]
}
