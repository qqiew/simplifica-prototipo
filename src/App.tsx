import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import PlanListScreen from './screens/PlanListScreen';
import PlanDetailScreen from './screens/PlanDetailScreen';
import PlanCompareScreen from './screens/PlanCompareScreen';
import NetworkScreen from './screens/NetworkScreen';
import ContractStartScreen from './screens/ContractStartScreen';
import DocumentUploadScreen from './screens/DocumentUploadScreen';
import LgpdConsentScreen from './screens/LgpdConsentScreen';
import SignatureScreen from './screens/SignatureScreen';
import ProposalStatusScreen from './screens/ProposalStatusScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<SplashScreen />} />
        <Route path="/login"               element={<LoginScreen />} />
        <Route path="/register"            element={<RegisterScreen />} />
        <Route path="/onboarding"          element={<OnboardingScreen />} />
        <Route path="/plans"               element={<PlanListScreen />} />
        <Route path="/plans/compare"       element={<PlanCompareScreen />} />
        <Route path="/plans/:id"           element={<PlanDetailScreen />} />
        <Route path="/plans/:id/network"   element={<NetworkScreen />} />
        <Route path="/contract"            element={<ContractStartScreen />} />
        <Route path="/contract/documents"  element={<DocumentUploadScreen />} />
        <Route path="/contract/lgpd"       element={<LgpdConsentScreen />} />
        <Route path="/contract/signature"  element={<SignatureScreen />} />
        <Route path="/contract/status"     element={<ProposalStatusScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
