type params = {
    host__iregex?: string;
    start__gte?: string;
    end_lte?: string;
    order?: 'start';
}

type ContestMeta = {
    estimated_count: number;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total_count: null | number;
};

type ContestObject = {
    duration: number;
    end: string;
    event: string;
    host: string;
    href: string;
    id: number;
    n_problems: number;
    n_statistics: number;
    parsed_at: string;
    problems: null | any[];
    resource: string;
    resource_id: number;
    start: string;
};

type ContestResponse = {
    meta: ContestMeta;
    objects: ContestObject[];
};


interface Config {
    [key: string]: any;
}


