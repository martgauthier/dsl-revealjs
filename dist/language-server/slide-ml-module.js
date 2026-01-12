import { createDefaultCoreModule, createDefaultSharedCoreModule, inject } from "langium";
import { NodeFileSystemProvider } from "langium/node";
import { DslRevealJsGeneratedSharedModule, SlideMLGeneratedModule } from "./generated/module.js";
/**
 * Langium CLI configuration (Node.js)
 */
export function createSlideMLServices() {
    // Shared services (FS, registry, workspace…)
    const shared = inject(createDefaultSharedCoreModule({
        fileSystemProvider: () => new NodeFileSystemProvider()
    }), DslRevealJsGeneratedSharedModule);
    // Language-specific services
    const SlideML = inject(createDefaultCoreModule({ shared }), SlideMLGeneratedModule);
    shared.ServiceRegistry.register(SlideML);
    return { shared, SlideML };
}
//# sourceMappingURL=slide-ml-module.js.map