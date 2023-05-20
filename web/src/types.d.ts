namespace app {
  namespace dto {
    interface MemoryListItem {
      id: string;
      coverUrl: string;
      excerpt: string;
      createdAt: string;
      isPublic: boolean;
    }

    interface UniqueMemory {
      id: string;
      coverUrl: string;
      content: string;
      isPublic: boolean;
      createdAt: string;
    }
  }
}
