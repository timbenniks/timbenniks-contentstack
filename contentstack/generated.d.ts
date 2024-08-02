export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

export interface File {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: any[];
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
  publish_details: PublishDetails;
}

export interface Link {
  title: string;
  href: string;
}

export interface Taxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

export interface TwoColumns {
  /** Version */
  _version?: 1;
  /** Two column connection */
  two_column_connection?: TwoColumnComponent[];
}

export interface Articles {
  /** Version */
  _version?: 1;
  /** Title */
  title?: string;
  /** Query */
  query?: {
    /** Limit */
    limit?: number | null;
  };
  /** Design */
  design?: {
    /** Small */
    small?: boolean;
    /** First Featured */
    first_featured?: boolean;
  };
}

export interface Talks {
  /** Version */
  _version?: 1;
  /** Title */
  title?: string;
  /** Design */
  design?: {
    /** Small */
    small?: boolean;
  };
  /** Query */
  query?: {
    /** Limit */
    limit?: number | null;
  };
}

export interface Videos {
  /** Version */
  _version?: 2;
  /** Title */
  title?: string;
  /** Description */
  description?: string;
  /** Extra's URL */
  extra_s_url?: string;
  /** Design */
  design?: {
    /** Small */
    small?: boolean;
    /** firstFeatured */
    firstfeatured?: boolean;
  };
  /** Query */
  query?: {
    /** Limit */
    limit?: number | null;
    /** tag */
    tag?: string;
  };
}

export interface Hero {
  /** Version */
  _version?: 10;
  /** Title */
  title?: string;
  /** Title Tag */
  title_tag?: ("h1" | "h2" | "h3" | "h4" | "p") | null;
  /** Sub Title */
  sub_title?: string;
  /** Sub Title Tag */
  sub_title_tag?: ("h1" | "h2" | "h3" | "h4" | "p") | null;
  /** Image */
  image?: any;
  /** Ctas */
  ctas?: {
    cta: {
      /** url */ url?: Link;
      /** target */
      target?: ("_self" | "_blank") | null;
    };
  }[];
  /** Design */
  design?: {
    /** Right */
    right?: boolean;
    /** Smaller Title */
    smaller_title?: boolean;
  };
}

export interface Richtext {
  /** Version */
  _version?: 4;
  /** Body */
  body: string;
}

export interface TwoColumnComponent {
  /** Version */
  _version?: 2;
  /** Title */
  title: string;
  /** Side b */
  side_b?: (
    | {
        richtext: Richtext;
        articles: undefined;
        talks: undefined;
        videos: undefined;
      }
    | {
        articles: Articles;
        richtext: undefined;
        talks: undefined;
        videos: undefined;
      }
    | {
        talks: Talks;
        richtext: undefined;
        articles: undefined;
        videos: undefined;
      }
    | {
        videos: Videos;
        richtext: undefined;
        articles: undefined;
        talks: undefined;
      }
  )[];
  /** Side a */
  side_a?: (
    | {
        richtext: Richtext;
        articles: undefined;
        talks: undefined;
        videos: undefined;
      }
    | {
        articles: Articles;
        richtext: undefined;
        talks: undefined;
        videos: undefined;
      }
    | {
        talks: Talks;
        richtext: undefined;
        articles: undefined;
        videos: undefined;
      }
    | {
        videos: Videos;
        richtext: undefined;
        articles: undefined;
        talks: undefined;
      }
  )[];
}

export interface Article {
  /** Version */
  _version?: 16;
  /** Title */
  title: string;
  /** URL */
  url: string;
  /** Canonical URL */
  canonical_url?: string;
  /** Description */
  description?: string;
  /** Date */
  date?: string | null;
  /** Image */
  image?: string;
  /** reading_time */
  reading_time?: string;
  /** Body */
  body?: string;
}

export interface Talk {
  /** Version */
  _version?: 8;
  /** Title */
  title: string;
  /** Talk */
  talk?: string;
  /** Conference */
  conference?: string;
  /** Location */
  location?: string;
  /** Date */
  date?: string | null;
  /** Link */
  link?: string;
}

export interface Video {
  /** Version */
  _version?: 10;
  /** Title */
  title: string;
  /** Date */
  date?: string | null;
  /** Description */
  description?: string;
  /** Image */
  image?: string;
  /** Video ID */
  videoid?: string;
}

export interface Page {
  /** Version */
  _version?: 16;
  /** Title */
  title: string;
  /** URL */
  url?: string;
  /** SEO */
  seo?: {
    /** Image */
    image?: any;
    /** Description */
    description?: string;
    /** Keywords */
    keywords?: string[];
  };
  /** Components */
  components?: (
    | {
        hero: Hero;
        richtext: undefined;
        videos: undefined;
        talks: undefined;
        articles: undefined;
        two_columns: undefined;
      }
    | {
        richtext: Richtext;
        hero: undefined;
        videos: undefined;
        talks: undefined;
        articles: undefined;
        two_columns: undefined;
      }
    | {
        videos: Videos;
        hero: undefined;
        richtext: undefined;
        talks: undefined;
        articles: undefined;
        two_columns: undefined;
      }
    | {
        talks: Talks;
        hero: undefined;
        richtext: undefined;
        videos: undefined;
        articles: undefined;
        two_columns: undefined;
      }
    | {
        articles: Articles;
        hero: undefined;
        richtext: undefined;
        videos: undefined;
        talks: undefined;
        two_columns: undefined;
      }
    | {
        two_columns: TwoColumns;
        hero: undefined;
        richtext: undefined;
        videos: undefined;
        talks: undefined;
        articles: undefined;
      }
  )[];
}
