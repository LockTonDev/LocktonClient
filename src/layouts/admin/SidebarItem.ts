const adminPath = 'lcksl-fr/lypts/sol01';

export default [
  { header: `Icons` },
  {
    title: `대쉬보드`,
    icon: `pie-chart`,
    to: `/${adminPath}/dev/AT1`
  },
  { header: `계약관리` },
  {
    model: false,
    title: `계약관리`,
    icon: `shopping-bag`,
    to: `/${adminPath}/dev/AC2/TAX`,
    children: [
      {
        title: `세무사`,
        to: `/${adminPath}/dev/AC2/TAX`
      },
      {
        title: `회계사`,
        to: `/${adminPath}/dev/AC2/ACC`
      },
      {
        title: `변호사`,
        to: `/${adminPath}/dev/AC2/ADV`
      },
      {
        title: `관세사`,
        to: `/${adminPath}/dev/AC2/CAA`
      },
      {
        title: `변리사`,
        to: `/${adminPath}/dev/AC2/PAT`
      }
    ]
  },
  { header: `계약갱신` },
  {
    model: false,
    title: `계약갱신`,
    icon: `file-text`,
    to: `/${adminPath}/dev/AC4/TAX`,
    children: [
      {
        title: `세무사`,
        to: `/${adminPath}/dev/AC4/TAX`
      },
      {
        title: `회계사`,
        to: `/${adminPath}/dev/AC4/ACC`
      },
      {
        title: `변호사`,
        to: `/${adminPath}/dev/AC4/ADV`
      },
      {
        title: `관세사`,
        to: `/${adminPath}/dev/AC4/CAA`
      },
      {
        title: `변리사`,
        to: `/${adminPath}/dev/AC4/PAT`
      }
    ]
  },

  { header: `입금처리` },
  {
    model: false,
    title: `입금처리`,
    icon: `dollar-sign`,
    to: `/${adminPath}/dev/AC5/TAX`,
    children: [
      {
        title: `세무사`,
        to: `/${adminPath}/dev/AC5/TAX`
      },
      {
        title: `회계사`,
        to: `/${adminPath}/dev/AC5/ACC`
      },
      {
        title: `변호사`,
        to: `/${adminPath}/dev/AC5/ADV`
      },
      {
        title: `관세사`,
        to: `/${adminPath}/dev/AC5/CAA`
      },
      {
        title: `변리사`,
        to: `/${adminPath}/dev/AC5/PAT`
      }
    ]
  },
  { header: `계약변경` },
  {
    model: false,
    title: `계약변경`,
    icon: `edit`,
    to: `/${adminPath}/dev/AC6/TAX`,
    children: [
      {
        title: `세무사`,
        to: `/${adminPath}/dev/AC6/TAX`
      },
      {
        title: `회계사`,
        to: `/${adminPath}/dev/AC6/ACC`
      },
      {
        title: `변호사`,
        to: `/${adminPath}/dev/AC6/ADV`
      },
      {
        title: `관세사`,
        to: `/${adminPath}/dev/AC6/CAA`
      },
      {
        title: `변리사`,
        to: `/${adminPath}/dev/AC6/PAT`
      }
    ]
  },

  { header: `Components` },
  {
    group: `/ui-components/`,
    model: false,
    icon: `mic`,
    title: `알림마당 관리`,
    children: [
      {
        title: `알림마당`,
        to: `/${adminPath}/dev/AB1`
      }
    ]
  },
  {
    group: `/style-animation`,
    model: false,
    icon: `user`,
    title: `회원관리`,
    children: [
      {
        title: `전문인회원관리`,
        to: `/${adminPath}/dev/AU1`
      },
      {
        title: `전문인명단관리`,
        to: `/${adminPath}/dev/AU2`
      }
    ]
  },

  {
    title: `기타관리`,
    icon: `book-open`,
    to: `/icons/feather`,
    children: [
      {
        title: `약관`,
        to: `/${adminPath}/dev/AJ1`
      },
      {
        title: `공통코드`,
        to: `/${adminPath}/dev/AJ2`
      },
      {
        title: `보험료표`,
        to: `/${adminPath}/dev/AJ3`
      }
    ]
  }
];
