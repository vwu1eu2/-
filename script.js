document.addEventListener("DOMContentLoaded", function() {
  // التأكد من وجود العنصر الخاص بعرض النموذج ثلاثي الأبعاد
  const canvasContainer = document.getElementById('3d-canvas');
  if (!canvasContainer) return;

  // إعداد المشهد والكاميرا والمُرسِم
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe9ecef);

  // إعداد الكاميرا
  const camera = new THREE.PerspectiveCamera(
    75, 
    canvasContainer.clientWidth / canvasContainer.clientHeight, 
    0.1, 
    1000
  );
  camera.position.set(0, 1.5, 4);

  // إعداد المُرسِم
  const renderer = new THREE.WebGLRenderer({ canvas: canvasContainer, antialias: true });
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // إضافة إضاءة للمشهد
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // تحميل نموذج الغسالة ثلاثي الأبعاد باستخدام GLTFLoader
  const loader = new THREE.GLTFLoader();
  // تأكد من وجود ملف washing_machine.glb في المستودع أو استبدل الرابط برابط مباشر لنموذج الغسالة
  loader.load('washing_machine.glb', function(gltf) {
      const washingMachine = gltf.scene;
      washingMachine.position.set(0, 0, 0);
      washingMachine.scale.set(1, 1, 1);
      scene.add(washingMachine);

      // يمكنك إضافة تأثيرات دوران للنموذج للتفاعل معه
      const animate = function () {
        requestAnimationFrame(animate);
        washingMachine.rotation.y += 0.005;
        renderer.render(scene, camera);
      };
      animate();
  }, undefined, function (error) {
      console.error('حدث خطأ أثناء تحميل النموذج:', error);
  });

  // تحديث حجم المُرسِم عند تغيير حجم النافذة
  window.addEventListener('resize', function() {
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  });
});
