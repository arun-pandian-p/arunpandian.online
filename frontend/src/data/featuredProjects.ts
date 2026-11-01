export interface FeaturedProjectCard {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  accentColor: string;
  accentBorder: string;
  badgeBg: string;
  metrics: { label: string; value: string }[];
  codePreview: {
    filename: string;
    snippet: string;
  };
  githubUrl: string;
  liveUrl?: string;
}

export const featuredProjectCards: FeaturedProjectCard[] = [
  {
    id: 'zappy',
    number: '01',
    category: 'RESTAURANT SAAS PLATFORM',
    title: 'Zappy',
    tagline: 'Multi-Tenant QR-Ordering & Kitchen Display System',
    description:
      'High-concurrency restaurant platform featuring strict multi-tenant data isolation, real-time kitchen display synchronization, and dynamic QR code generation with sub-50ms order routing.',
    technologies: ['React 19', 'TypeScript', 'Java 21', 'Spring Boot 3', 'PostgreSQL', 'Docker'],
    accentColor: 'text-sky-500 dark:text-sky-400',
    accentBorder: 'border-sky-500/30 dark:border-sky-400/30',
    badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-300',
    metrics: [
      { label: 'Architecture', value: 'Multi-Tenant' },
      { label: 'KDS Latency', value: '< 50ms' },
      { label: 'QR Routing', value: 'Dynamic' },
    ],
    codePreview: {
      filename: 'OrderRoutingService.java',
      snippet: `@Service
@Transactional
public class OrderRoutingService {
  private final KitchenStationRouter router;
  private final TenantContext tenantContext;

  public OrderTicket routeIncomingOrder(OrderPayload payload) {
    String tenantId = tenantContext.requireCurrentTenant();
    OrderTicket ticket = OrderTicket.fromPayload(tenantId, payload);
    return router.dispatchToStation(ticket);
  }
}`,
    },
    githubUrl: 'https://github.com/arun-pandian-p/Zappy',
    liveUrl: 'https://github.com/arun-pandian-p/Zappy',
  },
  {
    id: 'it-ticket',
    number: '02',
    category: 'ENTERPRISE SERVICE LAYER',
    title: 'IT Helpdesk & Incident Management System',
    tagline: 'Automated SLA Routing & Role-Based Workflows',
    description:
      'ITIL-inspired enterprise incident management system with automated SLA evaluation, role-based ticket assignment engines, audit logging, and full containerized deployment.',
    technologies: ['Java 21', 'TypeScript', 'React 19', 'Spring Boot', 'PostgreSQL', 'Docker'],
    accentColor: 'text-amber-500 dark:text-amber-400',
    accentBorder: 'border-amber-500/30 dark:border-amber-400/30',
    badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
    metrics: [
      { label: 'SLA Engine', value: 'Automated 99.4%' },
      { label: 'Dispatch', value: 'Event-Driven' },
      { label: 'Auth Model', value: 'JWT + RBAC' },
    ],
    codePreview: {
      filename: 'TicketWorkflowEngine.java',
      snippet: `@Service
public class TicketWorkflowEngine {
  private final SlaPolicyEvaluator policyEvaluator;
  private final TicketEventPublisher eventPublisher;

  @Transactional
  public Ticket transitionState(TicketId id, TicketState targetState, UserActor actor) {
    Ticket ticket = loadAndLock(id);
    policyEvaluator.validateTransition(ticket, targetState, actor);
    ticket.applyState(targetState, actor);
    eventPublisher.publish(new TicketTransitionEvent(ticket));
    return ticket;
  }
}`,
    },
    githubUrl: 'https://github.com/arun-pandian-p/IT-Helpdesk-and-incident-Management-System',
    liveUrl: 'https://github.com/arun-pandian-p/IT-Helpdesk-and-incident-Management-System',
  },
  {
    id: 'ap-desktop',
    number: '03',
    category: 'DEVELOPER PRODUCTIVITY TOOL',
    title: 'Ap Desktop',
    tagline: 'Offline Placement Preparation Platform',
    description:
      'Local-first desktop environment for coding pattern revision and technical interview prep with native SQLite full-text search, zero-latency IPC bridges, and automated review scheduling.',
    technologies: ['Electron', 'React 19', 'TypeScript', 'SQLite', 'Tailwind CSS', 'Java Runtime'],
    accentColor: 'text-indigo-500 dark:text-indigo-400',
    accentBorder: 'border-indigo-500/30 dark:border-indigo-400/30',
    badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300',
    metrics: [
      { label: 'Offline Engine', value: '100% Native' },
      { label: 'Search Index', value: 'SQLite FTS5' },
      { label: 'Sync Model', value: 'Local First' },
    ],
    codePreview: {
      filename: 'PatternEngine.ts',
      snippet: `export class LocalPatternEngine {
  private db: Database;

  async queryPatterns(topic: string, difficulty: Difficulty): Promise<Pattern[]> {
    const stmt = this.db.prepare(\`
      SELECT p.*, r.confidence_score 
      FROM patterns p 
      LEFT JOIN reviews r ON p.id = r.pattern_id
      WHERE p.topic = ? AND p.level = ? 
      ORDER BY r.next_review_date ASC
    \`);
    return stmt.all(topic, difficulty) as Pattern[];
  }
}`,
    },
    githubUrl: 'https://github.com/arun-pandian-p/Ap-Desktop',
    liveUrl: 'https://github.com/arun-pandian-p/Ap-Desktop',
  },
  {
    id: 'eeg-seizure',
    number: '04',
    category: 'INTELLIGENT HEALTHCARE SYSTEM',
    title: 'Explainable AI Seizure Prediction Dashboard',
    tagline: 'Deep Learning EEG Pipeline with Interpretability',
    description:
      'Clinical deep learning pipeline analyzing multi-channel EEG biosignals for pre-ictal seizure prediction, paired with SHAP/LIME attribution heatmaps for verifiable medical interpretability.',
    technologies: ['Python 3.11', 'PyTorch', 'FastAPI', 'SHAP', 'MNE-Python', 'React 19', 'Docker'],
    accentColor: 'text-emerald-500 dark:text-emerald-400',
    accentBorder: 'border-emerald-500/30 dark:border-emerald-400/30',
    badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
    metrics: [
      { label: 'Accuracy', value: '94.2% ROC-AUC' },
      { label: 'Inference', value: '< 120ms' },
      { label: 'Explainability', value: 'SHAP / LIME' },
    ],
    codePreview: {
      filename: 'eeg_predict_pipeline.py',
      snippet: `class SeizurePredictionPipeline:
    def __init__(self, model_path: str, explainer_weights: str):
        self.encoder = torch.jit.load(model_path)
        self.shap_explainer = DeepExplainer(self.encoder)

    def analyze_window(self, eeg_tensor: torch.Tensor) -> PredictionSummary:
        risk_score = self.encoder(eeg_tensor).softmax(dim=-1)
        attributions = self.shap_explainer.shap_values(eeg_tensor)
        return PredictionSummary(risk=risk_score[0, 1].item(), attributions=attributions)
}`,
    },
    githubUrl: 'https://github.com/arun-pandian-p/xai-seizure-prediction-dashboard',
    liveUrl: 'https://github.com/arun-pandian-p/xai-seizure-prediction-dashboard',
  },
];
