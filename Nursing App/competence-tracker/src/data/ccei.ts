// CCEI 2.0 rubric — 25 items across 4 categories.
// Source: "CCEI 2.0 8.2.23.xlsx" (Creighton Competency Evaluation Instrument).
// Generated; do not edit by hand.

export type CategoryId =
  | 'clinical-judgment'
  | 'communication'
  | 'quality-safety'
  | 'professionalism'

export type SubstepId =
  | 'recognize-cues'
  | 'analyze-cues'
  | 'prioritize-hypotheses'
  | 'generate-solutions'
  | 'take-actions'
  | 'evaluate-outcomes'

export interface CceiCategory { id: CategoryId; label: string; description: string }
export interface CceiSubstep  { id: SubstepId;  label: string; description: string; categoryId: CategoryId }
export interface CceiItem     { id: string; number: number; title: string; description: string; examples: string[]; categoryId: CategoryId; substepId: SubstepId | null }

export const CCEI_CATEGORIES: CceiCategory[] = [
  { id: 'clinical-judgment', label: `Clinical Judgment`, description: `The skill of recognizing cues regarding a clinical situation, generating and weighing hypotheses, taking action, and evaluating outcomes for the purpose of arriving at a satisfactory clinical outcome. Clinical judgment is the observed outcome of two unobserved underlying mental processes, critical thinking and decision making` },
  { id: 'communication', label: `Communication`, description: `an exchange of information, thoughts, and feelings through a variety of mechanisms. The definition encompasses the various ways that people interact with each other, including verbal, written, behavioral, body language, touch, and emotion. Communication also incorporates intentionality, mutuality, partnerships, trust, and presence. Effective communication….is required for high quality, individualized health care…and can be delivered through technological modalities` },
  { id: 'quality-safety', label: `Quality & Safety`, description: `The individual acts to provide safe care by minimizing risk of harm to clients and providers through both system effectiveness and individual performance. Includes using data to evaluate the outcomes of the care processes and uses improvement strategies to make changes for continuously safe and quality care` },
  { id: 'professionalism', label: `Professionalism`, description: `Professionalism encompasses the development of a nursing identity embracing the values of integrity, altruism, inclusivity, compassion, courage, humility, advocacy, caring, autonomy, humanity and social justice. Professionalism necessitates the development of emotional intelligence to promote social good, engage in social justice, and demonstrate ethical comportment, moral courage and assertiveness in decision-making and actions` },
]

export const CCEI_SUBSTEPS: CceiSubstep[] = [
  { id: 'recognize-cues', label: `Recognize Cues`, description: `Identifying relevant clinical data and patient information. The learner recognizes pertinent cues from clients, families, or populations and can identify variances when they occur.  Cues may come from subjective or objective data, including the physical environment and social determinants of health (personal, social, economic, and environmental factors).`, categoryId: 'clinical-judgment' },
  { id: 'analyze-cues', label: `Analyze Cues`, description: `Interpreting the significance of the gathered information. The learner analyzes cues from the subjective and objective data.  As the learner interprets the data, they identify potential cause(s) of clinical problems.  This includes a synthesis of the assessment data within the context of the clinical setting`, categoryId: 'clinical-judgment' },
  { id: 'prioritize-hypotheses', label: `Prioritize Hypotheses`, description: `Determining the most likely explanations for a patient’s condition. The learner evaluates and ranks identified concerns. This prioritization can take many forms, such as urgency of concern, identifying cause of current symptoms, and/or determining what is the greatest risk factor contributing to current condition.`, categoryId: 'clinical-judgment' },
  { id: 'generate-solutions', label: `Generate Solutions`, description: `Developing appropriate interventions based on clinical reasoning. During this phase, the learner is creating solutions to address the identified concerns. Generation of solutions is informed by continuous recognition & analysis of new information as it becomes available, including input from the client. This can and should include client input into the plan of care, as appropriate.`, categoryId: 'clinical-judgment' },
  { id: 'take-actions', label: `Take Actions`, description: `Implementing interventions to address patient needs. To act in a particular way to ensure a specific result. This includes the implementation of interventions/consultations to ensure a specific outcome for the clinical problem. These interventions should be specific to the patient and their presentations for the identified clinical problem(s) (Betts et al., 2019).  Ensure that all interventions utilized are documented appropriately.`, categoryId: 'clinical-judgment' },
  { id: 'evaluate-outcomes', label: `Evaluate Outcomes`, description: `Assessing the effectiveness of interventions and adjusting care as needed. Measuring the effectiveness of interventions used to treat/improve the identified clinical problem(s). Ensure that the observed outcomes are consistent with the expected outcomes of the interventions used. If the observed outcomes are not consistent with the expected outcomes, then new interventions should be considered (Betts et al., 2019). Ensure that outcomes are appropriately documented.`, categoryId: 'clinical-judgment' },
]

export const CCEI_ITEMS: CceiItem[] = [
  { id: 'item-1', number: 1, title: `Obtains Pertinent Subjective Data`, description: `Identifies pertinent history information from client. Considers all aspects of the health history.  Conducts the health history in organized, logical manner. Asks probing questions, reviews medical record. Uses appropriate screening tools.`, examples: [`You asked: How would you rate your pain?`], categoryId: 'clinical-judgment', substepId: 'recognize-cues' },
  { id: 'item-2', number: 2, title: `Obtains Pertinent Objective Data`, description: `Identifies pertinent physical exam data. Uses techniques of inspection, palpation, auscultation, and percussion appropriately. Obtains vital signs, lab data, physical examination data in a systematic and organized manner.`, examples: [`Example of Actions:
- Ask “are you dizzy?”
- Ask:”How would you rate your pain on a scale of 0 to 10?”
-Ask: “Can you tell me where you are?”`], categoryId: 'clinical-judgment', substepId: 'recognize-cues' },
  { id: 'item-3', number: 3, title: `Assesses the Environment`, description: `Assesses the environment, dependent upon scenario and emphasis of the scenario. This can be the physical environment of a hospital room, a clinic room, a scene, an ambulance, a home environment, a community environment, a structural or unit environment.`, examples: [], categoryId: 'clinical-judgment', substepId: 'recognize-cues' },
  { id: 'item-4', number: 4, title: `Assesses Factors Affecting Health`, description: `Assesses for any factors influencing health, especially spiritual, cultural, and social determinants of health. Examples could include: Assess housing instability, food insecurity, transportation problems, utility help needs, interpersonal safety. Uses appropriate screening tools.`, examples: [], categoryId: 'clinical-judgment', substepId: 'recognize-cues' },
  { id: 'item-5', number: 5, title: `Recognizes Variances/Pertinent Data`, description: `Differentiates between normal and abnormal presenting symptoms, observations, or facts.`, examples: [], categoryId: 'clinical-judgment', substepId: 'recognize-cues' },
  { id: 'item-6', number: 6, title: `Interprets Subjective Data`, description: `Identifies meaning of subjective finding (patient report of a symptom, piece of family history data from electronic health record) and can cluster finding with other like findings (or separate from other findings).`, examples: [], categoryId: 'clinical-judgment', substepId: 'analyze-cues' },
  { id: 'item-7', number: 7, title: `Interprets Objective Data`, description: `Identifies the meaning of objective finding (lung sound, wound appearance, lab value) and can cluster finding with other like findings (or separate from other findings).`, examples: [], categoryId: 'clinical-judgment', substepId: 'analyze-cues' },
  { id: 'item-8', number: 8, title: `Identifies Cause(s) of Problem`, description: `Formulates hypotheses and appraisals to identify the cause of the identified problem.  Explores potential causes of problem(s); formulates list of appropriate differential diagnosis based on clinical presentation.`, examples: [], categoryId: 'clinical-judgment', substepId: 'analyze-cues' },
  { id: 'item-9', number: 9, title: `Identifies Expected Outcomes`, description: `Identifies outcomes related to possible differential diagnoses. This can be informed by asking “What is the greatest risk?”, or “What is urgent?”, or “What outcome takes priority?” This could require a ‘pause’ in scenario where student generates a list of priority outcomes.`, examples: [], categoryId: 'clinical-judgment', substepId: 'prioritize-hypotheses' },
  { id: 'item-10', number: 10, title: `Prioritizes Interventions`, description: `Develops a list of potential interventions to assist client. Prioritizes the potential interventions. 

Develops and Prioritizes differential diagnoses appropriately.`, examples: [], categoryId: 'clinical-judgment', substepId: 'prioritize-hypotheses' },
  { id: 'item-11', number: 11, title: `Generates Plan`, description: `Creates plan of care strategies to address priority outcomes and/or problems. This can include interventions and education, etc. 

Rules out differentials through appropriate diagnostic testing or other strategy. Choose final diagnosis if appropriate. Creates management plan to address priority outcomes and/or problems. This can include interventions and education, etc.`, examples: [], categoryId: 'clinical-judgment', substepId: 'generate-solutions' },
  { id: 'item-12', number: 12, title: `Review/Reassesses Pertinent Data`, description: `Reassesses patient data as needed to inform and/or reprioritize solutions/interventions. 

Reassesses differential diagnosis list periodically as needed. Uses patient data as needed to inform and/or reprioritize differentials or change diagnosis.`, examples: [], categoryId: 'clinical-judgment', substepId: 'generate-solutions' },
  { id: 'item-13', number: 13, title: `Manages Equipment and/or Devices Involved in Care`, description: `Manages all equipment that is being used in care of client appropriately and safely (for example: otoscopes, ophthalmoscopes, IV pumps, lifts, beds, etc.)`, examples: [], categoryId: 'clinical-judgment', substepId: 'take-actions' },
  { id: 'item-14', number: 14, title: `Implements Evidence-Based Interventions`, description: `Performs interventions correctly and safely, provides rationale (evidence) for interventions (includes patient education).`, examples: [], categoryId: 'clinical-judgment', substepId: 'take-actions' },
  { id: 'item-15', number: 15, title: `Evaluates Interventions in relation to Expected Outcomes`, description: `Evaluates if interventions were effective in addressing outcomes and/or problems. May require a ‘pause’ in scenario for learner to discuss/list what assessment findings are leading them to conclusion that intervention was either effective/ineffective.`, examples: [], categoryId: 'clinical-judgment', substepId: 'evaluate-outcomes' },
  { id: 'item-16', number: 16, title: `Modifies Expected Outcomes, Assessments, and/or Interventions`, description: `Modifies outcomes or assessments and interventions based upon if outcomes were achieved. May require a ‘pause’ in scenario for learner to discuss/list what modifications would be necessary.`, examples: [], categoryId: 'clinical-judgment', substepId: 'evaluate-outcomes' },
  { id: 'item-17', number: 17, title: `Demonstrates Reflective Practice`, description: `Provides written or verbal reflection on personal strengths and opportunities demonstrated in performance in the experience. Identifies near misses, mistakes made, and how to avoid in the future. Articulates plan for improvement and what was learned through the experience. Demonstrates insight into own biases, assumptions, actions.`, examples: [], categoryId: 'clinical-judgment', substepId: 'evaluate-outcomes' },
  { id: 'item-18', number: 18, title: `Communicates Professionally`, description: `Engages professionally in all interactions. Stakeholders can include a variety of audiences: client, family/support, leaders, community agencies, policymakers, sources of funding, nurses, interprofessional health care team members. Communicating effectively also involves effective use of conflict management and negotiation. Provides effective ‘hand off’ or transitional communication using appropriate tools/strategies (iSBAR, iSHAPED).`, examples: [`Examples of Actions:
Call Provider (at the expected time)
SBAR Activity Score 100%`], categoryId: 'communication', substepId: null },
  { id: 'item-19', number: 19, title: `Communicates Therapeutically`, description: `Establishes therapeutic presence and rapport with client. Actively listens to client. Demonstrates a caring presence and engages therapeutically in both verbal and nonverbal communication. Uses a variety of communication strategies as necessary.`, examples: [`Examples of Actions:
- Provide education about the plan of care
- Provide education about activities, safety & fall risk
- comfort patient`], categoryId: 'communication', substepId: null },
  { id: 'item-20', number: 20, title: `Documents Clearly, Concisely, Accurately, Efficiently`, description: `Accurately and concisely reflects care in the electronic health record.`, examples: [], categoryId: 'communication', substepId: null },
  { id: 'item-21', number: 21, title: `Integrates Informatics to Support Decision-Making`, description: `Uses resources available (policies and procedures, point of care references) to inform decision making. Additionally, utilizes technology to identify pertinent information (electronic health record, online references and point-of-care resources from credible sources, policy/procedures, etc.).`, examples: [`Example of Actions:
Review diagnostics in HER
Review Provider order
Review MAR`], categoryId: 'quality-safety', substepId: null },
  { id: 'item-22', number: 22, title: `Adheres to Principles of Patient Safety`, description: `Identifies patient using patient identifiers, uses sterile technique, washes hands, adheres to isolation or fall precautions as appropriate. 

Identifies patient using patient identifiers, uses sterile technique, washes hands, adheres to isolation or fall precautions as appropriate.  Ordering appropriate prescriptions considering various aspects that could impact patient.`, examples: [`Example of Actions:
Identify Patient
Introduce self
Wash Hands
Ask “do you have any allergies?”`], categoryId: 'quality-safety', substepId: null },
  { id: 'item-23', number: 23, title: `Advocates for Client`, description: `Engages in opportunities to advocate for client to alternate audiences (providers, nurses, family members, agency personnel, policymakers, leadership, etc.) as appropriate to situation.`, examples: [], categoryId: 'quality-safety', substepId: null },
  { id: 'item-24', number: 24, title: `Adheres to Legal and Ethical Standards of Care`, description: `Acts in accordance with the American Nurses Association Code of Ethics for Nurses, adheres to legal regulations and standards, functions at maximum level of leadership within scope of practice, recognizes ethical implications of decisions, utilizes ethical decision-making frameworks.`, examples: [], categoryId: 'professionalism', substepId: null },
  { id: 'item-25', number: 25, title: `Demonstrates Professional Behavior`, description: `Acts in accordance with the definition provided above, able to accept and incorporate instructor feedback, comes to clinical experience well prepared, not impaired (sleep deprived and/or other impairment), dressed professionally, conducts self in professional manner. Demonstrates leadership behaviors in clinical situations, navigates conflict professionally, maintains commitment to life-long learning.`, examples: [], categoryId: 'professionalism', substepId: null },
]
