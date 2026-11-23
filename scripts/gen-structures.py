#!/usr/bin/env python3
"""Regenerates src/assets/structures/*.svg from PubChem SMILES using RDKit (pip install rdkit).
SMILES come from PubChem PUG REST (CIDs below); formula and molar mass are asserted against the published values."""
import re, sys
from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors
from rdkit.Chem.Draw import rdMolDraw2D

# slug: (PubChem CID, SMILES as returned by PubChem, formula, molar mass)
MOLS = {
  'thc': (16078,   r'CCCCCC1=CC(=C2[C@@H]3C=C(CC[C@H]3C(OC2=C1)(C)C)C)O', 'C21H30O2', 314.46),
  'cbd': (644019,  r'CCCCCC1=CC(=C(C(=C1)O)[C@@H]2C=C(CC[C@H]2C(=C)C)C)O', 'C21H30O2', 314.46),
  'cbn': (2543,    r'CCCCCC1=CC(=C2C(=C1)OC(C3=C2C=C(C=C3)C)(C)C)O',        'C21H26O2', 310.43),
  'cbg': (5315659, r'CCCCCC1=CC(=C(C(=C1)O)C/C=C(\C)/CCC=C(C)C)O',          'C21H32O2', 316.48),
}
for slug, (cid, smi, formula, mass) in MOLS.items():
    m = Chem.MolFromSmiles(smi)
    got = rdMolDescriptors.CalcMolFormula(m)
    assert got == formula, (slug, got, formula)
    assert abs(Descriptors.MolWt(m) - mass) < 0.05, (slug, Descriptors.MolWt(m), mass)
    d = rdMolDraw2D.MolDraw2DSVG(480, 320)
    o = d.drawOptions(); o.clearBackground = False; o.bondLineWidth = 2; o.padding = 0.08; o.addStereoAnnotation = False
    rdMolDraw2D.PrepareAndDrawMolecule(d, m); d.FinishDrawing()
    svg = d.GetDrawingText()
    svg = re.sub(r'<\?xml[^>]*\?>\s*', '', svg)
    svg = re.sub(r"width='480px' height='320px' viewBox", 'viewBox', svg)
    svg = svg.replace("<svg ", f'<svg role="img" aria-label="{slug.upper()} structural formula (PubChem CID {cid})" ', 1)
    open(f'src/assets/structures/{slug}.svg', 'w').write(svg)
    print(f'{slug}: {got} {Descriptors.MolWt(m):.2f} g/mol  CID {cid}  {len(svg)} bytes')
