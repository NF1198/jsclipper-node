// Type definitions clipper.js - version 6.2.1
// Project: http://www.angusj.com
// Copyright :  Angus Johnson 2010-2014
// Definitions:
// Definitions author: Nicholas Folse <nickfolse@gmail.com>

export interface IntPoint {
  X: number;
  Y: number;
}

export type Path = IntPoint[];

export type Paths = Path[];

export enum ClipType {
  ctIntersection = 0,
  ctUnion = 1,
  ctDifference = 2,
  ctXor = 3
}

export enum EndType {
  etOpenSquare = 0,
  etOpenRound = 1,
  etOpenButt = 2,
  etClosedLine = 3,
  etClosedPolygon = 4
}

export enum JoinType {
  jtSquare = 0,
  jtRound = 1,
  jtMiter = 2
}

export enum PolyFillType {
  pftEvenOdd = 0,
  pftNonZero = 1,
  pftPositive = 2,
  pftNegatice = 3
}

export enum PolyType {
  ptSubject = 0,
  ptClip = 1
}

export enum InitOptions {
  ioReverseSolution = 1,
  ioStrictlySimple = 2,
  ioPreserveCollinear = 4
}

export class ClipperBase {
  AddPath(pg: Path, polytype: PolyType, closed: boolean): boolean;
  AddPaths(paths: Paths, polytype: PolyType, close: boolean): boolean;
  Clear(): void;
}

export class Clipper extends ClipperBase {
  constructor(initOptions?: InitOptions);
  Area(poly: Path): number;
  CleanPolygon(path: Path, distance: number): Path;
  CleanPolygons(polys: Paths, distance: number): Paths;
  ClosedPathsFromPolyTree(polytree: PolyTree): Paths;
  Execute(cliptype: ClipType, solution: ArrayLike<Path> | PolyTree, subjFillType?: PolyFillType, clipFillType?: PolyFillType);
  GetBounds(paths: Paths): IntRect;
  MinkowskiDiff(poly: Path, path: Path, isClosed: boolean): Paths;
  MinkowskiSum(pattern: Path, path: Path, pathIsClosed: boolean): Paths;
  MinkowskiSum(pattern: Path, path: Path, pathFillType: PolyFillType, pathIsClosed: boolean): Paths;
  OpenPathsFromPolyTree(polytree: PolyTree): Paths;
  Orientation(poly: Path): boolean;
  PointInPolygon(pt: IntPoint, poly: Path): boolean;
  PolyTreeToPaths(polytree: PolyTree): Paths;
  ReversePath(path: Path): void;
  ReversePaths(paths: Paths): void;
  SimplifyPolygon(poly: Path, fillType: PolyFillType.pftEvenOdd);
  SimplifyPolygons(polys: Paths, fillType: PolyFillType.pftEvenOdd);

  public PreserveCollinear: boolean;
  public ReverseSolution: boolean;
  public StrictlySimple: boolean;
}

export class IntRect {
  public left: number;
  public top: number;
  public right: number;
  public bottom: number;
  constructor(left: number, top: number, right: number, bottom: number);
  constructor();
  constructor(intRect: IntRect);
}

export class PolyTree {
  Clear(): void;
  GetFirst(): PolyNode;
  Total(): number;
}

export class PolyNode {
  ChildCount(): number;
  Childs(): PolyNode[];
  Contour(): Path;
  GetNext(): PolyNode;
  IsHole(): boolean;
  Parent(): PolyNode;
  public readonly IsOpen: boolean;
}

export class ClipperOffset {
  constructor(miterLimit?: number, roundPrecision?: number);
  AddPath(path: ArrayLike<IntPoint>, jointype: JoinType, endtype: EndType): void;
  AddPaths(paths: ArrayLike<Path>, jointype: JoinType, endtype: EndType): void;
  Clear(): void;
  Execute(solution: ArrayLike<Path> | PolyTree, delta: number): void;
  public ArcTolerance: number;
  public MiterLimit: number;
}

export namespace JS {
  export function AreaOfPolygon(poly: ArrayLike<IntPoint>, scale: 1): number;
  export function AreaOfPolygons(polys: ArrayLike<Path>, scale: 1): number;
  export function BoundsOfPaths(paths: ArrayLike<Path>, scale: 1): IntRect;
  export function Clone(path: ArrayLike<IntPoint>): ArrayLike<IntPoint>;
  export function Clone(paths: ArrayLike<Path>): ArrayLike<Path>;
  export function Clean(path: ArrayLike<IntPoint>): ArrayLike<IntPoint>;
  export function Clean(paths: ArrayLike<Path>): ArrayLike<Path>;
  export function Lighten(path: ArrayLike<IntPoint>, tolerance: number): ArrayLike<IntPoint>;
  export function PerimeterOfPath(path: ArrayLike<IntPoint>, closed: boolean, scale: 1): number;
  export function PerimeterOfPaths(paths: ArrayLike<Path>, closed: boolean, scale: 1): number;
  export function ScaleDownPath(path: ArrayLike<IntPoint>, scale: 1): void;
  export function ScaleDownPaths(paths: ArrayLike<Path>, scale: 1): void;
  export function ScaleUpPath(path: ArrayLike<IntPoint>, scale: 1): void;
  export function ScaleUpPaths(paths: ArrayLike<Path>, scale: 1): void;
}

export as namespace ClipperLib;