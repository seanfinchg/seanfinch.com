export type PhotoStack = { files: string[] };

export const photoStacks: PhotoStack[] = [
  { files: ["DSC_9335.webp"] }, { files: ["DSC_9329.webp"] }, { files: ["DSC_9328.webp"] }, { files: ["DSC_9314.webp"] },
  { files: ["DSC_9312.webp"] }, { files: ["DSC_9310.webp"] }, { files: ["DSC_9301.webp"] }, { files: ["DSC_9274.webp"] },
  { files: ["DSC_9261.webp"] }, { files: ["DSC_9260.webp"] }, { files: ["DSC_9259.webp"] }, { files: ["DSC_9258.webp"] },
  { files: ["DSC_9253.webp"] }, { files: ["DSC_9251.webp"] }, { files: ["DSC_9249.webp"] }, { files: ["DSC_9241.webp"] },
  { files: ["DSC_9239.webp"] }, { files: ["DSC_9238.webp"] }, { files: ["DSC_9233.webp"] }, { files: ["DSC_9224.webp"] },
  { files: ["DSC_9198.webp"] }, { files: ["DSC_9180.webp"] }, { files: ["DSC_9176.webp"] }, { files: ["DSC_9174.webp"] },
  { files: ["DSC_9167.webp"] }, { files: ["DSC_9158.webp"] }, { files: ["DSC_9141.webp"] }, { files: ["DSC_9100.webp"] },
  { files: ["DSC_9085.webp"] }, { files: ["DSC_9070.webp"] }, { files: ["DSC_9061.webp"] }, { files: ["DSC_9053.webp"] },
  { files: ["DSC_9041.webp"] }, { files: ["DSC_9039.webp"] }, { files: ["DSC_9016.webp"] }, { files: ["DSC_9013.webp"] },
  { files: ["DSC_9005.webp"] }, { files: ["DSC_9001.webp"] }, { files: ["DSC_8963.webp"] }, { files: ["DSC_8938.webp"] },
  { files: ["DSC_8929.webp"] },
  { files: ["DSC_8892.webp", "DSC_8892_edited.webp"] },
  { files: ["DSC_8875.webp", "DSC_8875_edited.webp"] },
  { files: ["DSC_8874.webp"] },
  { files: ["DSC_8866.webp", "DSC_8866_edited.webp"] },
  { files: ["DSC_8865.webp", "DSC_8865_edited.webp"] },
  { files: ["DSC_8864.webp", "DSC_8864_edited.webp"] },
  { files: ["DSC_8828.webp"] }, { files: ["DSC_8815.webp"] }, { files: ["DSC_8795.webp"] },
  { files: ["DSC_8752.webp"] }, { files: ["DSC_8749.webp"] }, { files: ["DSC_8736.webp"] }, { files: ["DSC_8723.webp"] },
  { files: ["DSC_8716.webp"] }, { files: ["DSC_8687.webp"] }, { files: ["DSC_8686.webp"] }, { files: ["DSC_8677.webp"] },
  { files: ["DSC_8609.webp"] }, { files: ["DSC_8575.webp"] }, { files: ["DSC_8573.webp"] }, { files: ["DSC_8540.webp"] },
  { files: ["DSC_8411.webp"] }, { files: ["DSC_8401.webp"] }, { files: ["DSC_8400.webp"] }, { files: ["DSC_8399.webp"] },
  { files: ["DSC_8398.webp"] }, { files: ["DSC_8397.webp"] }, { files: ["DSC_8391.webp"] }, { files: ["DSC_8381.webp"] },
  { files: ["DSC_8379.webp"] }, { files: ["DSC_8361.webp"] }, { files: ["DSC_8332.webp"] }, { files: ["DSC_8326.webp"] },
  { files: ["DSC_8177.webp"] }, { files: ["DSC_8175.webp"] }, { files: ["DSC_8165.webp"] },
  { files: ["DSC_7922.webp"] }, { files: ["DSC_7907.webp"] }, { files: ["DSC_7829.webp"] }, { files: ["DSC_7822.webp"] },
  { files: ["DSC_7817.webp"] }, { files: ["DSC_7813.webp"] }, { files: ["DSC_7812.webp"] }, { files: ["DSC_7809.webp"] },
  { files: ["DSC_7806.webp"] }, { files: ["DSC_7772.webp"] }, { files: ["DSC_7754.webp"] },
  { files: ["DSC_7407.webp"] }, { files: ["DSC_7383.webp"] }, { files: ["DSC_7299.webp"] }, { files: ["DSC_7195.webp"] },
  { files: ["DSC_6989.webp"] }, { files: ["DSC_6951.webp"] }, { files: ["DSC_6783.webp"] }, { files: ["DSC_6750.webp"] },
  { files: ["DSC_6732.webp"] },
  { files: ["DSC_6698.webp", "DSC_6698 (1).webp", "DSC_6698 (2).webp"] },
  { files: ["DSC_6597.webp"] }, { files: ["DSC_6397.webp"] }, { files: ["DSC_6357.webp"] }, { files: ["DSC_6180.webp"] },
  { files: ["DSC_6017.webp"] }, { files: ["DSC_6010.webp"] }, { files: ["DSC_5891.webp"] }, { files: ["DSC_5636.webp"] },
  { files: ["DSC_5619.webp"] },
  { files: ["DSCF0999-EDIT.webp"] }, { files: ["DSCF0753.webp"] }, { files: ["DSCF0740.webp"] },
  { files: ["DSCF0579.webp"] }, { files: ["DSCF0296.webp"] }, { files: ["DSCF0092 1.webp"] },
  { files: ["IMG_0017.webp"] },
];

export const PHOTOS_PER_PAGE = 20;
export const photoSrc = (f: string) => `/photography/${encodeURIComponent(f)}`;

// Flat cover list used for preloading in Navbar / App
export const photos = photoStacks.map(s => s.files[0]);
