export interface AppStateService {
    setError: (msg: string | null) => void;
    setSuccess: (msg: string| null) => void;
    setLoading: () => void;
}
